import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import pool from '../config/db.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { canVote } from '../utils/electionStatus.js';
import { logAction } from '../utils/logger.js';

const router = Router();

router.post(
  '/',
  authenticate,
  requireRole('voter', 'admin'),
  [body('election_id').isInt({ min: 1 }), body('candidate_id').isInt({ min: 1 })],
  async (req, res, next) => {
    const client = await pool.connect();
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { election_id, candidate_id } = req.body;
      const userId = req.user.id;

      await client.query('BEGIN');

      const { rows: electionRows } = await client.query('SELECT * FROM elections WHERE id = $1', [
        election_id,
      ]);
      const election = electionRows[0];
      if (!election) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: 'Election not found' });
      }

      if (!canVote(election)) {
        await client.query('ROLLBACK');
        return res.status(400).json({ message: 'Voting is not open for this election' });
      }

      const { rows: candidateRows } = await client.query(
        'SELECT id FROM candidates WHERE id = $1 AND election_id = $2',
        [candidate_id, election_id]
      );
      const candidate = candidateRows[0];
      if (!candidate) {
        await client.query('ROLLBACK');
        return res.status(400).json({ message: 'Invalid candidate for this election' });
      }

      const { rows: existing } = await client.query(
        'SELECT id FROM votes WHERE election_id = $1 AND user_id = $2 FOR UPDATE',
        [election_id, userId]
      );
      if (existing.length) {
        await client.query('ROLLBACK');
        return res.status(409).json({ message: 'You have already voted in this election' });
      }

      const receipt_salt = crypto.randomBytes(16).toString('hex');
      const hashData = `${election_id}:${candidate_id}:${userId}:${receipt_salt}`;
      const transaction_hash = crypto.createHash('sha256').update(hashData).digest('hex');

      await client.query(
        'INSERT INTO votes (election_id, user_id, candidate_id, transaction_hash, receipt_salt) VALUES ($1, $2, $3, $4, $5)',
        [election_id, userId, candidate_id, transaction_hash, receipt_salt]
      );

      await logAction('VOTE_CAST', { election_id, transaction_hash }, userId);

      await client.query('COMMIT');
      res.status(201).json({ message: 'Vote recorded successfully', transaction_hash });
    } catch (err) {
      await client.query('ROLLBACK');
      if (err.code === '23505') {
        return res.status(409).json({ message: 'You have already voted in this election' });
      }
      next(err);
    } finally {
      client.release();
    }
  }
);

router.get('/my', authenticate, async (req, res, next) => {
  try {
    const { rows: votes } = await pool.query(
      `SELECT v.id, v.voted_at, v.transaction_hash, e.id AS election_id, e.title AS election_title,
              c.id AS candidate_id, c.full_name AS candidate_name, c.party
       FROM votes v
       JOIN elections e ON e.id = v.election_id
       JOIN candidates c ON c.id = v.candidate_id
       WHERE v.user_id = $1
       ORDER BY v.voted_at DESC`,
      [req.user.id]
    );
    res.json({ votes });
  } catch (err) {
    next(err);
  }
});

// Public Bulletin Board Route
router.get('/bulletin/:electionId', async (req, res, next) => {
  try {
    const { rows: bulletin } = await pool.query(
      `SELECT transaction_hash, voted_at 
       FROM votes 
       WHERE election_id = $1 AND transaction_hash IS NOT NULL
       ORDER BY voted_at DESC`,
      [req.params.electionId]
    );
    res.json({ bulletin });
  } catch (err) {
    next(err);
  }
});

export default router;
