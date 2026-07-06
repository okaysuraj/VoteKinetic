import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { prisma } from '../db/prisma';
import { EncryptionService } from '../services/encryption.service';
import { z } from 'zod';

const router = Router();

// List active elections (Voter scoped)
router.get('/', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const elections = await prisma.election.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        status: true,
        type: true
      }
    });
    res.json({ elections });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch elections' });
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

// Create new election (Admin scoped - in reality require role check)
router.post('/', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = createElectionSchema.parse(req.body);
    
    // Generate RSA key pair for this election
    const { publicKey, privateKey } = EncryptionService.generateKeyPair();

    const election = await prisma.election.create({
      data: {
        organizationId: data.organizationId,
        title: data.title,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        publicKey: publicKey,
        // In a real system, privateKey MUST be stored securely (e.g. AWS KMS, Hashicorp Vault)
        // Since schema doesn't store private key, we will just log it for demo purposes, 
        // but typically it should be stored in a separate secure table or KMS
        candidates: {
          create: data.candidates
        }
      },
      include: {
        candidates: true
      }
    });

    console.log(`[SECURE LOG] Private Key for election ${election.id} generated. Store this securely!`);
    
    res.json({ election });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
