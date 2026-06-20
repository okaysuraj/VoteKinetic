import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, requireRole('admin'));

router.get('/', async (req, res, next) => {
  try {
    const { rows: users } = await pool.query(
      `SELECT id, full_name, email, role, is_active, created_at
       FROM users ORDER BY created_at DESC`
    );
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/toggle-active', async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    if (userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot deactivate your own account' });
    }

    const result = await pool.query(
      'UPDATE users SET is_active = NOT is_active WHERE id = $1',
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { rows: userRows } = await pool.query(
      'SELECT id, full_name, email, role, is_active FROM users WHERE id = $1',
      [userId]
    );
    const user = userRows[0];
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

export default router;
