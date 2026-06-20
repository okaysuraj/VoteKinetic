import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { generateSecret, generateURI, verifySync } from 'otplib';
import qrcode from 'qrcode';
import pool from '../config/db.js';
import { authenticate } from '../middleware/auth.js';
import { logAction } from '../utils/logger.js';

const router = Router();

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

router.post(
  '/register',
  [
    body('full_name').trim().isLength({ min: 2, max: 120 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { full_name, email, password } = req.body;
      const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.length) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      const password_hash = await bcrypt.hash(password, 10);
      const { rows: inserted } = await pool.query(
        'INSERT INTO users (full_name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
        [full_name, email, password_hash, 'voter']
      );

      const user = { id: inserted[0].id, full_name, email, role: 'voter' };
      const token = signToken(user);
      
      await logAction('USER_REGISTERED', { email }, user.id);

      res.status(201).json({ message: 'Registration successful', token, user });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const { rows } = await pool.query(
        'SELECT id, full_name, email, password_hash, role, is_active, mfa_enabled, totp_secret FROM users WHERE email = $1',
        [email]
      );

      if (!rows.length) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = rows[0];
      if (!user.is_active) {
        return res.status(403).json({ message: 'Account is deactivated' });
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (user.mfa_enabled) {
        const { totp_code } = req.body;
        if (!totp_code) {
          return res.status(403).json({ message: 'MFA required', requires_mfa: true });
        }
        
        const { valid: isValidMFA } = verifySync({ token: totp_code, secret: user.totp_secret });
        if (!isValidMFA) {
          return res.status(401).json({ message: 'Invalid two-factor authentication code' });
        }
      }

      const token = signToken(user);
      
      await logAction('USER_LOGGED_IN', { email: user.email }, user.id);

      res.json({
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          mfa_enabled: user.mfa_enabled,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, full_name, email, role, mfa_enabled, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: rows[0] });
  } catch (err) {
    next(err);
  }
});

// MFA Routes
router.post('/mfa/generate', authenticate, async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT email FROM users WHERE id = $1', [req.user.id]);
    const userEmail = rows[0].email;
    
    const secret = generateSecret();
    const otpauth = generateURI({ issuer: 'VoteKinetic', label: userEmail, secret });
    const qrCodeUrl = await qrcode.toDataURL(otpauth);
    
    // Temporarily save secret, don't enable MFA until verified
    await pool.query('UPDATE users SET totp_secret = $1 WHERE id = $2', [secret, req.user.id]);
    
    res.json({ secret, qrCodeUrl });
  } catch (err) {
    next(err);
  }
});

router.post('/mfa/verify', authenticate, [body('code').notEmpty()], async (req, res, next) => {
  try {
    const { code } = req.body;
    const { rows } = await pool.query('SELECT totp_secret FROM users WHERE id = $1', [req.user.id]);
    const secret = rows[0].totp_secret;
    
    if (!secret) return res.status(400).json({ message: 'MFA not generated' });
    
    const { valid } = verifySync({ token: code, secret });
    if (!valid) return res.status(400).json({ message: 'Invalid code' });
    
    await pool.query('UPDATE users SET mfa_enabled = true WHERE id = $1', [req.user.id]);
    await logAction('MFA_ENABLED', {}, req.user.id);
    
    res.json({ message: 'MFA enabled successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
