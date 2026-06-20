import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/db.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/election/:electionId', authenticate, async (req, res, next) => {
  try {
    const electionId = Number(req.params.electionId);
    const { rows: candidates } = await pool.query(
      'SELECT * FROM candidates WHERE election_id = $1 ORDER BY full_name',
      [electionId]
    );
    res.json({ candidates });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authenticate,
  requireRole('admin'),
  [
    body('election_id').isInt({ min: 1 }),
    body('full_name').trim().isLength({ min: 2, max: 120 }),
    body('party').optional().trim().isLength({ max: 120 }),
    body('bio').optional().trim(),
    body('photo_url').optional({ values: 'falsy' }).trim().isURL(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { election_id, full_name, party, bio, photo_url } = req.body;
      const { rows: electionRows } = await pool.query('SELECT id FROM elections WHERE id = $1', [
        election_id,
      ]);
      const election = electionRows[0];
      if (!election) {
        return res.status(404).json({ message: 'Election not found' });
      }

      const { rows: resultRows } = await pool.query(
        `INSERT INTO candidates (election_id, full_name, party, bio, photo_url)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [election_id, full_name, party || null, bio || null, photo_url || null]
      );

      const { rows: candidateRows } = await pool.query('SELECT * FROM candidates WHERE id = $1', [
        resultRows[0].id,
      ]);
      const candidate = candidateRows[0];
      res.status(201).json({ candidate });
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
    body('full_name').optional().trim().isLength({ min: 2, max: 120 }),
    body('party').optional().trim().isLength({ max: 120 }),
    body('bio').optional().trim(),
    body('photo_url').optional().trim(),
  ],
  async (req, res, next) => {
    try {
      const candidateId = Number(req.params.id);
      const { rows: existingRows } = await pool.query('SELECT * FROM candidates WHERE id = $1', [
        candidateId,
      ]);
      const existing = existingRows[0];
      if (!existing) {
        return res.status(404).json({ message: 'Candidate not found' });
      }

      const full_name = req.body.full_name ?? existing.full_name;
      const party = req.body.party ?? existing.party;
      const bio = req.body.bio ?? existing.bio;
      const photo_url = req.body.photo_url ?? existing.photo_url;

      await pool.query(
        'UPDATE candidates SET full_name = $1, party = $2, bio = $3, photo_url = $4 WHERE id = $5',
        [full_name, party, bio, photo_url, candidateId]
      );

      const { rows: candidateRows } = await pool.query('SELECT * FROM candidates WHERE id = $1', [
        candidateId,
      ]);
      const candidate = candidateRows[0];
      res.json({ candidate });
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const candidateId = Number(req.params.id);
    const result = await pool.query('DELETE FROM candidates WHERE id = $1', [candidateId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
