import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { prisma } from '../db/prisma';
import { AuditService } from '../services/audit.service';
import { parse } from 'csv-parse/sync';
import { z } from 'zod';

const router = Router();

// Middleware to ensure admin scope would go here in production
// const requireAdmin = ...

const pauseElectionSchema = z.object({
  electionId: z.string().uuid()
});

router.post('/pause', requireAuth, async (req: AuthenticatedRequest, res) => {
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

router.post('/import-voters', requireAuth, async (req: AuthenticatedRequest, res) => {
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

router.get('/metrics', requireAuth, async (req: AuthenticatedRequest, res) => {
  // Super Admin metrics
  try {
    const totalUsers = await prisma.user.count();
    const totalElections = await prisma.election.count();
    const totalVotes = await prisma.encryptedVote.count();

    res.json({ totalUsers, totalElections, totalVotes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

export default router;
