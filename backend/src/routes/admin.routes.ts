import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';
import { prisma } from '../db/prisma';
import { AuditService } from '../services/audit.service';
import { parse } from 'csv-parse/sync';
import { z } from 'zod';

const router = Router();

const requireAdmin = requireRole(['SUPER_ADMIN', 'ORG_ADMIN', 'ELECTION_ADMIN']);

const pauseElectionSchema = z.object({
  electionId: z.string().uuid()
});

router.post('/pause', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { electionId } = pauseElectionSchema.parse(req.body);
    
    const election = await prisma.election.update({
      where: { id: electionId },
      data: { status: 'PAUSED' }
    });

    await AuditService.log('ELECTION_PAUSED', 'ELECTION', electionId, req.user?.uid);
    res.json({ message: 'Election paused securely', election });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

const csvSchema = z.object({
  electionId: z.string().uuid(),
  csvData: z.string() // In a real app, use multer to handle multipart/form-data file uploads
});

router.post('/import-voters', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { electionId, csvData } = csvSchema.parse(req.body);
    
    // Parse CSV: expected format "email"
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });

    const eligibilityRecords = records.map((record: any) => ({
      electionId,
      email: record.email,
    }));

    // Bulk insert, skipping duplicates
    const result = await prisma.eligibility.createMany({
      data: eligibilityRecords,
      skipDuplicates: true
    });

    await AuditService.log('VOTERS_IMPORTED', 'ELECTION', electionId, req.user?.uid, { count: result.count });

    res.json({ message: `Successfully imported ${result.count} voters.` });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

const addVoterSchema = z.object({
  electionId: z.string().uuid(),
  email: z.string().email()
});

router.post('/add-voter', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { electionId, email } = addVoterSchema.parse(req.body);
    
    await prisma.eligibility.create({
      data: {
        electionId,
        email
      }
    });

    await AuditService.log('VOTER_ADDED', 'ELECTION', electionId, req.user?.uid, { email });

    res.json({ message: 'Voter added successfully' });
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Voter already exists in this election' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Manage Users
router.get('/users', requireAuth, requireRole(['SUPER_ADMIN']), async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { roles: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get Abuse Reports (Mocked ML detection)
router.get('/abuse-reports', requireAuth, requireRole(['SUPER_ADMIN']), async (req, res) => {
  try {
    // In a real app this would query a dedicated ML-flagged abuse table or external service
    res.json({
      reports: [
        { id: 'rep-1', type: 'RAPID_VOTING', severity: 'HIGH', userEmail: 'suspicious@example.com', timestamp: new Date().toISOString(), status: 'PENDING_REVIEW' },
        { id: 'rep-2', type: 'IP_MISMATCH', severity: 'MEDIUM', userEmail: 'traveler@example.com', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'RESOLVED' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch abuse reports' });
  }
});

router.post('/users', requireAuth, requireRole(['SUPER_ADMIN']), async (req, res) => {
  try {
    const { email, displayName, role } = req.body;
    const user = await prisma.user.create({
      data: {
        firebaseUid: `mock-uid-${Date.now()}`,
        email,
        displayName
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Super Admin metrics
router.get('/metrics', requireAuth, requireRole(['SUPER_ADMIN']), async (req: AuthenticatedRequest, res) => {
  try {
    const [totalUsers, totalElections, totalVotes, totalOrganizations] = await Promise.all([
      prisma.user.count(),
      prisma.election.count(),
      prisma.encryptedVote.count(),
      prisma.organization.count(),
    ]);

    const activeElections = await prisma.election.count({ where: { status: 'ACTIVE' } });
    const activeOrganizations = await prisma.organization.count({
      where: { elections: { some: { status: 'ACTIVE' } } }
    });

    res.json({ 
      totalUsers, 
      totalElections, 
      totalVotes, 
      totalOrganizations,
      activeElections,
      activeOrganizations,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Super Admin dashboard — full data
router.get('/dashboard', requireAuth, requireRole(['SUPER_ADMIN']), async (req: AuthenticatedRequest, res) => {
  try {
    const [totalUsers, totalElections, totalVotes, totalOrganizations] = await Promise.all([
      prisma.user.count(),
      prisma.election.count(),
      prisma.encryptedVote.count(),
      prisma.organization.count(),
    ]);

    const activeOrganizations = await prisma.organization.count({
      where: { elections: { some: { status: 'ACTIVE' } } }
    });

    // Recent security-related audit logs (abuse detection feed)
    const recentAlerts = await prisma.auditLog.findMany({
      where: {
        action: {
          in: ['LOGIN_FAILED', 'BRUTE_FORCE_DETECTED', 'SUSPICIOUS_ACTIVITY', 'VOTER_ADDED', 'ELECTION_PAUSED']
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: { select: { email: true, displayName: true } }
      }
    });

    res.json({
      metrics: {
        totalUsers,
        totalElections,
        totalVotes,
        totalOrganizations,
        activeOrganizations,
      },
      recentAlerts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Audit logs - for admin and voter activity views
router.get('/audit-logs', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { entityType, limit = '20', offset = '0', userId: filterUserId } = req.query;

    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user!.uid },
      include: { roles: { include: { role: true } } }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isSuperAdmin = user.roles.some(r => r.role.name === 'SUPER_ADMIN');
    const isAdmin = user.roles.some(r => ['SUPER_ADMIN', 'ORG_ADMIN', 'ELECTION_ADMIN'].includes(r.role.name));

    // Build where clause
    const where: any = {};
    
    if (!isAdmin) {
      // Non-admins can only see their own logs
      where.userId = user.id;
    } else if (filterUserId && typeof filterUserId === 'string') {
      where.userId = filterUserId;
    }

    if (entityType && typeof entityType === 'string') {
      where.entityType = entityType;
    }

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      include: {
        user: { select: { email: true, displayName: true } }
      }
    });

    const total = await prisma.auditLog.count({ where });

    res.json({ logs, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// Turnout analytics for a specific election
router.get('/analytics/turnout/:electionId', requireAuth, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { electionId } = req.params;

    const election = await prisma.election.findUnique({
      where: { id: electionId },
      include: {
        _count: { select: { votes: true, eligibility: true } },
        eligibility: {
          select: { hasVoted: true }
        }
      }
    });

    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    const totalEligible = election._count.eligibility;
    const totalVotes = election._count.votes;
    const turnoutPercentage = totalEligible > 0 ? ((totalVotes / totalEligible) * 100).toFixed(1) : '0';

    res.json({
      electionId,
      title: election.title,
      totalEligible,
      totalVotes,
      turnoutPercentage: parseFloat(turnoutPercentage),
      status: election.status,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch turnout analytics' });
  }
});

// Live Metrics via Server-Sent Events (SSE)
router.get('/metrics/live', requireAuth, requireRole(['SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish SSE

  const sendMetrics = async () => {
    try {
      const [totalUsers, totalElections, totalVotes] = await Promise.all([
        prisma.user.count(),
        prisma.election.count(),
        prisma.encryptedVote.count()
      ]);
      const data = JSON.stringify({ totalUsers, totalElections, totalVotes });
      res.write(`data: ${data}\n\n`);
    } catch (error) {
      console.error('SSE Metrics Error:', error);
    }
  };

  // Send initial metrics
  sendMetrics();

  // Send updates every 5 seconds
  const intervalId = setInterval(sendMetrics, 5000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

export default router;
