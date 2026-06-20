import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/db.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { computeElectionStatus, canVote } from '../utils/electionStatus.js';
import { logAction } from '../utils/logger.js';

const router = Router();

function enrichElection(election) {
  return {
    ...election,
    live_status: computeElectionStatus(election),
    can_vote: canVote(election),
  };
}

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { rows: elections } = await pool.query(
      `SELECT e.*, u.full_name AS created_by_name,
        (SELECT COUNT(*) FROM candidates c WHERE c.election_id = e.id) AS candidate_count,
        (SELECT COUNT(*) FROM votes v WHERE v.election_id = e.id) AS vote_count
       FROM elections e
       JOIN users u ON u.id = e.created_by
       ORDER BY e.start_date DESC`
    );

    const userId = req.user.id;
    const enriched = await Promise.all(
      elections.map(async (election) => {
        const base = enrichElection(election);
        const { rows: voteRows } = await pool.query(
          'SELECT id FROM votes WHERE election_id = $1 AND user_id = $2',
          [election.id, userId]
        );
        return { ...base, has_voted: voteRows.length > 0 };
      })
    );

    res.json({ elections: enriched });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const electionId = Number(req.params.id);
    const { rows: electionRows } = await pool.query(
      `SELECT e.*, u.full_name AS created_by_name
       FROM elections e
       JOIN users u ON u.id = e.created_by
       WHERE e.id = $1`,
      [electionId]
    );
    const election = electionRows[0];

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    const { rows: candidates } = await pool.query(
      'SELECT * FROM candidates WHERE election_id = $1 ORDER BY full_name',
      [electionId]
    );

    const { rows: voteRows } = await pool.query(
      'SELECT candidate_id FROM votes WHERE election_id = $1 AND user_id = $2',
      [electionId, req.user.id]
    );

    res.json({
      election: enrichElection(election),
      candidates,
      has_voted: voteRows.length > 0,
      voted_candidate_id: voteRows[0]?.candidate_id ?? null,
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authenticate,
  requireRole('admin'),
  [
    body('title').trim().isLength({ min: 3, max: 200 }),
    body('description').optional().trim(),
    body('start_date').isISO8601(),
    body('end_date').isISO8601(),
    body('status').optional().isIn(['draft', 'active', 'completed', 'cancelled']),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, start_date, end_date, status = 'draft' } = req.body;
      if (new Date(end_date) <= new Date(start_date)) {
        return res.status(400).json({ message: 'End date must be after start date' });
      }

      const { rows: resultRows } = await pool.query(
        `INSERT INTO elections (title, description, start_date, end_date, status, created_by)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [title, description || null, start_date, end_date, status, req.user.id]
      );

      const { rows: insertElecRows } = await pool.query('SELECT * FROM elections WHERE id = $1', [
        resultRows[0].id,
      ]);
      const election = insertElecRows[0];
      
      await logAction('ELECTION_CREATED', { election_id: election.id, title: election.title }, req.user.id);
      
      res.status(201).json({ election: enrichElection(election) });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  authenticate,
  requireRole('admin'),
  [
    body('title').optional().trim().isLength({ min: 3, max: 200 }),
    body('description').optional().trim(),
    body('start_date').optional().isISO8601(),
    body('end_date').optional().isISO8601(),
    body('status').optional().isIn(['draft', 'active', 'completed', 'cancelled']),
  ],
  async (req, res, next) => {
    try {
      const electionId = Number(req.params.id);
      const { rows: existingRows } = await pool.query('SELECT * FROM elections WHERE id = $1', [
        electionId,
      ]);
      const existing = existingRows[0];
      if (!existing) {
        return res.status(404).json({ message: 'Election not found' });
      }

      const title = req.body.title ?? existing.title;
      const description = req.body.description ?? existing.description;
      const start_date = req.body.start_date ?? existing.start_date;
      const end_date = req.body.end_date ?? existing.end_date;
      const status = req.body.status ?? existing.status;

      if (new Date(end_date) <= new Date(start_date)) {
        return res.status(400).json({ message: 'End date must be after start date' });
      }

      await pool.query(
        `UPDATE elections SET title = $1, description = $2, start_date = $3, end_date = $4, status = $5
         WHERE id = $6`,
        [title, description, start_date, end_date, status, electionId]
      );

      const { rows: updateElecRows } = await pool.query('SELECT * FROM elections WHERE id = $1', [
        electionId,
      ]);
      const election = updateElecRows[0];
      
      await logAction('ELECTION_UPDATED', { election_id: election.id, title: election.title }, req.user.id);
      
      res.json({ election: enrichElection(election) });
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const electionId = Number(req.params.id);
    const result = await pool.query('DELETE FROM elections WHERE id = $1', [electionId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Election not found' });
    }
    
    await logAction('ELECTION_DELETED', { election_id: electionId }, req.user.id);
    
    res.json({ message: 'Election deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
