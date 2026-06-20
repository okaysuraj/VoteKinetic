import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { rows: userStatsRows } = await pool.query(
      `SELECT
        COUNT(*) AS total_users,
        SUM(CASE WHEN role = 'voter' THEN 1 ELSE 0 END) AS voters,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) AS admins,
        SUM(CASE WHEN is_active = true THEN 1 ELSE 0 END) AS active_users
       FROM users`
    );
    const userStats = userStatsRows[0];

    const { rows: electionStatsRows } = await pool.query(
      `SELECT
        COUNT(*) AS total_elections,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_elections,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) AS draft_elections,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_elections
       FROM elections`
    );
    const electionStats = electionStatsRows[0];

    const { rows: voteStatsRows } = await pool.query('SELECT COUNT(*) AS total_votes FROM votes');
    const voteStats = voteStatsRows[0];

    res.json({
      users: userStats,
      elections: electionStats,
      votes: voteStats,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/election/:id/results', authenticate, async (req, res, next) => {
  try {
    const electionId = Number(req.params.id);
    const { rows: electionRows } = await pool.query('SELECT * FROM elections WHERE id = $1', [
      electionId,
    ]);
    const election = electionRows[0];
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    const { rows: results } = await pool.query(
      `SELECT c.id, c.full_name, c.party, c.bio,
              COUNT(v.id) AS vote_count
       FROM candidates c
       LEFT JOIN votes v ON v.candidate_id = c.id
       WHERE c.election_id = $1
       GROUP BY c.id
       ORDER BY vote_count DESC, c.full_name`,
      [electionId]
    );

    const { rows: totalsRows } = await pool.query(
      'SELECT COUNT(*) AS total_votes FROM votes WHERE election_id = $1',
      [electionId]
    );
    const totals = totalsRows[0];

    const totalVotes = Number(totals.total_votes) || 0;
    const withPercentages = results.map((row) => {
      const voteCount = Number(row.vote_count);
      return {
        ...row,
        vote_count: voteCount,
        percentage: totalVotes ? Math.round((voteCount / totalVotes) * 1000) / 10 : 0,
      };
    });

    res.json({
      election,
      total_votes: totalVotes,
      results: withPercentages,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/logs', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { rows: logs } = await pool.query(
      'SELECT id, action, details, current_hash, created_at FROM system_logs ORDER BY created_at DESC LIMIT 5'
    );
    res.json({ logs });
  } catch (err) {
    next(err);
  }
});

export default router;
