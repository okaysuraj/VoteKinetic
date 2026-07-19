import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';
import { prisma } from '../db/prisma';
import { AuditService } from '../services/audit.service';
import { z } from 'zod';

const router = Router();

// Only SUPER_ADMIN can create organizations
const requireSuperAdmin = requireRole(['SUPER_ADMIN']);
const requireOrgAdminOrSuper = requireRole(['SUPER_ADMIN', 'ORG_ADMIN']);

const createOrgSchema = z.object({
  name: z.string().min(2),
  domain: z.string().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
});

// Create organization
router.post('/', requireAuth, requireSuperAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const data = createOrgSchema.parse(req.body);
    
    const org = await prisma.organization.create({
      data: {
        name: data.name,
        domain: data.domain,
        timezone: data.timezone,
        currency: data.currency,
      }
    });

    await AuditService.log('ORGANIZATION_CREATED', 'ORGANIZATION', org.id, req.user?.uid);
    res.json({ organization: org });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create organization' });
  }
});

// List organizations (scoped by role)
router.get('/', requireAuth, requireOrgAdminOrSuper, async (req: AuthenticatedRequest, res) => {
  try {
    const user = req.dbUser as any; 
    const isSuperAdmin = user?.roles?.some((r: any) => r.role.name === 'SUPER_ADMIN');

    let orgs;
    if (isSuperAdmin) {
      orgs = await prisma.organization.findMany({
        include: {
          _count: {
            select: { users: true, elections: true }
          }
        }
      });
    } else {
      const orgIds = user?.roles
        ?.filter((r: any) => r.role.name === 'ORG_ADMIN' && r.organizationId)
        .map((r: any) => r.organizationId) || [];
        
      orgs = await prisma.organization.findMany({
        where: { id: { in: orgIds } },
        include: {
          _count: {
            select: { users: true, elections: true }
          }
        }
      });
    }

    res.json({ organizations: orgs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

// Get single organization with stats
router.get('/:id', requireAuth, requireOrgAdminOrSuper, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    const org = await prisma.organization.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true, elections: true }
        },
        elections: {
          select: {
            id: true,
            title: true,
            status: true,
            startDate: true,
            endDate: true,
            _count: { select: { votes: true, eligibility: true } }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!org) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // Get total votes across all elections in this org
    const totalVotes = await prisma.encryptedVote.count({
      where: {
        election: { organizationId: id }
      }
    });

    res.json({ organization: org, totalVotes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organization' });
  }
});

// Update organization
const updateOrgSchema = z.object({
  name: z.string().min(2).optional(),
  domain: z.string().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
  settings: z.record(z.any()).optional(),
});

router.patch('/:id', requireAuth, requireOrgAdminOrSuper, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const data = updateOrgSchema.parse(req.body);

    const org = await prisma.organization.update({
      where: { id },
      data
    });

    await AuditService.log('ORGANIZATION_UPDATED', 'ORGANIZATION', id, req.user?.uid, data);
    res.json({ organization: org });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update organization' });
  }
});

// ---- MEMBER MANAGEMENT ----

// List members of an organization
router.get('/:id/members', requireAuth, requireOrgAdminOrSuper, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;

    const members = await prisma.userRole.findMany({
      where: { organizationId: id },
      include: {
        user: {
          select: { id: true, email: true, displayName: true, isActive: true, createdAt: true }
        },
        role: {
          select: { id: true, name: true }
        }
      }
    });

    res.json({ members });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Add a member to an organization
const addMemberSchema = z.object({
  email: z.string().email(),
  roleName: z.string() // e.g. ORG_ADMIN, VOTER, AUDITOR, OBSERVER
});

router.post('/:id/members', requireAuth, requireOrgAdminOrSuper, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { email, roleName } = addMemberSchema.parse(req.body);

    // Find or validate user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found. They must register first.' });
    }

    // Find role
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      return res.status(400).json({ error: `Role '${roleName}' does not exist` });
    }

    // Create the membership
    const membership = await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: role.id,
        organizationId: id,
      },
      include: {
        user: { select: { id: true, email: true, displayName: true } },
        role: { select: { id: true, name: true } }
      }
    });

    await AuditService.log('MEMBER_ADDED', 'ORGANIZATION', id, req.user?.uid, { email, roleName });
    res.json({ member: membership });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'User already has this role in this organization' });
    }
    res.status(400).json({ error: error.message || 'Failed to add member' });
  }
});

// Update a member's role
const updateMemberSchema = z.object({
  roleName: z.string().optional(),
});

router.patch('/:id/members/:memberId', requireAuth, requireOrgAdminOrSuper, async (req: AuthenticatedRequest, res) => {
  try {
    const { id, memberId } = req.params;
    const { roleName } = updateMemberSchema.parse(req.body);

    if (roleName) {
      const role = await prisma.role.findUnique({ where: { name: roleName } });
      if (!role) {
        return res.status(400).json({ error: `Role '${roleName}' does not exist` });
      }

      await prisma.userRole.update({
        where: { id: memberId },
        data: { roleId: role.id }
      });
    }

    await AuditService.log('MEMBER_UPDATED', 'ORGANIZATION', id, req.user?.uid, { memberId, roleName });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update member' });
  }
});

// Remove a member from organization
router.delete('/:id/members/:memberId', requireAuth, requireOrgAdminOrSuper, async (req: AuthenticatedRequest, res) => {
  try {
    const { id, memberId } = req.params;

    await prisma.userRole.delete({
      where: { id: memberId }
    });

    await AuditService.log('MEMBER_REMOVED', 'ORGANIZATION', id, req.user?.uid, { memberId });
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to remove member' });
  }
});

export default router;
