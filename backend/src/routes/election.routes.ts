import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';
import { prisma } from '../db/prisma';
import { EncryptionService } from '../services/encryption.service';
import { z } from 'zod';
import { redisClient } from '../config/redis';

const router = Router();
const requireAdmin = requireRole(['SUPER_ADMIN', 'ORG_ADMIN']);

// List active elections (Voter scoped)
router.get('/', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const cacheKey = 'elections:active';
    const cached = await redisClient.get(cacheKey);
    
    if (cached) {
      return res.json({ elections: JSON.parse(cached) });
    }

    const elections = await prisma.election.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        status: true,
        type: true,
        publicKey: true
      }
    });

    // Cache for 60 seconds
    await redisClient.set(cacheKey, JSON.stringify(elections), 'EX', 60);

    res.json({ elections });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch elections' });
  }
});

// List ALL elections (Admin scoped)
router.get('/all', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const elections = await prisma.election.findMany({
      include: {
        organization: true,
        _count: {
          select: { votes: true, eligibility: true }
        }
      }
    });
    res.json({ elections });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all elections' });
  }
});

// Get single election details
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    
    const election = await prisma.election.findUnique({
      where: { id },
      include: {
        organization: { select: { id: true, name: true } },
        candidates: true,
        _count: {
          select: { votes: true, eligibility: true }
        }
      }
    });

    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    // Check if current user is eligible
    let userEligibility = null;
    if (req.user?.email) {
      userEligibility = await prisma.eligibility.findUnique({
        where: {
          electionId_email: {
            electionId: id,
            email: req.user.email
          }
        }
      });
    }

    res.json({ 
      election,
      isEligible: !!userEligibility,
      hasVoted: userEligibility?.hasVoted || false
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch election details' });
  }
});

const createElectionSchema = z.object({
  organizationId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  candidates: z.array(z.object({
    name: z.string(),
    bio: z.string().optional()
  }))
});

// Create new election (Admin scoped)
router.post('/', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const data = createElectionSchema.parse(req.body);
    
    // Generate RSA key pair for this election
    const { publicKey, privateKey } = EncryptionService.generateKeyPair();
    
    // Encrypt private key using local KMS equivalent
    const encryptedPrivateKey = EncryptionService.encryptPrivateKey(privateKey);

    const election = await prisma.election.create({
      data: {
        organizationId: data.organizationId,
        title: data.title,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        publicKey: publicKey,
        encryptedPrivateKey: encryptedPrivateKey,
        candidates: {
          create: data.candidates
        }
      },
      include: {
        candidates: true
      }
    });
    
    res.json({ election });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete election
router.delete('/:id', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.election.delete({ where: { id } });
    await redisClient.del('elections:active');
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete election' });
  }
});

const updateElectionSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

// Update election details (Admin scoped)
router.patch('/:id', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const data = updateElectionSchema.parse(req.body);
    
    const existing = await prisma.election.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Election not found' });
    if (existing.status === 'ACTIVE' || existing.status === 'CLOSED' || existing.status === 'ARCHIVED') {
       return res.status(403).json({ error: 'Cannot modify election details in this status' });
    }

    const election = await prisma.election.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate && { endDate: new Date(data.endDate) }),
      }
    });
    
    await redisClient.del('elections:active');
    
    res.json({ election });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update election status (Admin scoped)
const updateStatusSchema = z.object({
  status: z.enum(['DRAFT', 'SCHEDULED', 'ACTIVE', 'PAUSED', 'CLOSED', 'ARCHIVED'])
});

router.patch('/:id/status', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = updateStatusSchema.parse(req.body);
    
    const election = await prisma.election.update({
      where: { id },
      data: { status }
    });
    
    // Clear cache
    await redisClient.del('elections:active');
    
    res.json({ election });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Create a candidate
router.post('/:id/candidates', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { name, bio, imageUrl, order } = req.body;
    
    const candidate = await prisma.candidate.create({
      data: {
        electionId: id,
        name,
        bio,
        imageUrl,
        order: order || 0
      }
    });

    // Invalidate caches
    await redisClient.del('elections:active');
    
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create candidate' });
  }
});

// Update a candidate
router.patch('/:id/candidates/:candidateId', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id, candidateId } = req.params;
    const { name, bio, imageUrl } = req.body;
    
    const candidate = await prisma.candidate.update({
      where: { id: candidateId, electionId: id },
      data: {
        ...(name && { name }),
        ...(bio !== undefined && { bio }),
        ...(imageUrl && { imageUrl })
      }
    });

    await redisClient.del('elections:active');
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update candidate' });
  }
});

// Delete a candidate
router.delete('/:id/candidates/:candidateId', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id, candidateId } = req.params;
    
    await prisma.candidate.delete({
      where: { id: candidateId, electionId: id }
    });

    await redisClient.del('elections:active');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete candidate' });
  }
});

// Reorder candidates
router.post('/:id/candidates/reorder', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { orders } = req.body; // Array of { id: string, order: number }

    if (!Array.isArray(orders)) {
      return res.status(400).json({ error: 'orders must be an array' });
    }

    // Update orders in a transaction
    await prisma.$transaction(
      orders.map((item) => 
        prisma.candidate.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    );

    // Invalidate caches
    await redisClient.del('elections:active');

    res.json({ success: true, message: 'Candidates reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder candidates' });
  }
});

// Clone an election
router.post('/:id/clone', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    
    const sourceElection = await prisma.election.findUnique({
      where: { id },
      include: { candidates: true }
    });

    if (!sourceElection) {
      return res.status(404).json({ error: 'Election not found' });
    }

    // Generate new keys for the cloned election
    const keyPair = EncryptionService.generateElectionKeyPair();

    const clonedElection = await prisma.election.create({
      data: {
        title: `Copy of ${sourceElection.title}`,
        description: sourceElection.description,
        type: sourceElection.type,
        status: 'DRAFT',
        organizationId: sourceElection.organizationId,
        publicKey: keyPair.publicKey,
        encryptedPrivateKey: keyPair.encryptedPrivateKey,
        // Keep dates null or same? Usually drafts need new dates
        startDate: new Date(Date.now() + 86400000), // Tomorrow
        endDate: new Date(Date.now() + 86400000 * 3), // +3 days
        candidates: {
          create: sourceElection.candidates.map(c => ({
            name: c.name,
            bio: c.bio,
            imageUrl: c.imageUrl,
            order: c.order
          }))
        }
      }
    });

    res.status(201).json({ message: 'Election cloned successfully', election: clonedElection });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clone election' });
  }
});

export default router;
