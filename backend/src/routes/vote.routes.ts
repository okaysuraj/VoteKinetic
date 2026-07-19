import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { prisma } from '../db/prisma';
import crypto from 'crypto';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../config/redis';

const router = Router();

const voteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(args[0], ...args.slice(1)) as any,
  }),
  message: { error: 'Too many voting requests, please try again later.' }
});

// Step 1: Request a voting token
router.post('/token', requireAuth, voteLimiter, async (req: AuthenticatedRequest, res) => {
  try {
    const { electionId } = req.body;
    const userEmail = req.user!.email!;

    // Verify eligibility
    const eligibility = await prisma.eligibility.findUnique({
      where: {
        electionId_email: {
          electionId,
          email: userEmail
        }
      }
    });

    if (!eligibility) {
      return res.status(403).json({ error: 'Not eligible to vote in this election' });
    }
    if (eligibility.hasVoted) {
      return res.status(403).json({ error: 'Already voted' });
    }

    // Generate token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await prisma.$transaction(async (tx) => {
      await tx.votingToken.create({
        data: {
          electionId,
          tokenHash,
          expiresAt
        }
      });

      await tx.eligibility.update({
        where: {
          electionId_email: {
            electionId,
            email: userEmail
          }
        },
        data: {
          hasVoted: true
        }
      });
    });

    // Return the raw token (only sent once to client)
    res.json({ token: rawToken, expiresAt });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// Step 2: Submit an encrypted vote
router.post('/submit', voteLimiter, async (req, res) => {
  try {
    const { electionId, token, encryptedPayload } = req.body;

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 1. Verify and consume token atomically
    const activeToken = await prisma.votingToken.findUnique({
      where: { tokenHash }
    });

    if (!activeToken || activeToken.isUsed || activeToken.electionId !== electionId) {
      return res.status(403).json({ error: 'Invalid or used voting token' });
    }
    if (new Date() > activeToken.expiresAt) {
      return res.status(403).json({ error: 'Voting token expired' });
    }

    // 2. Hash encrypted payload for integrity
    const voteHash = crypto.createHash('sha256').update(encryptedPayload).digest('hex');

    // 3. Perform transaction to record vote and invalidate token
    await prisma.$transaction(async (tx) => {
      // Mark token as used
      await tx.votingToken.update({
        where: { id: activeToken.id },
        data: { isUsed: true, usedAt: new Date() }
      });

      // Insert append-only vote
      await tx.encryptedVote.create({
        data: {
          electionId,
          encryptedPayload,
          voteHash
        }
      });
    });

    res.json({ success: true, receipt: voteHash });
  } catch (error) {
    console.error('Vote submission error:', error);
    res.status(500).json({ error: 'Failed to submit vote' });
  }
});

export default router;
