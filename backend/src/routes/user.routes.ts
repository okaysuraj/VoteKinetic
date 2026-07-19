import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { prisma } from '../db/prisma';
import { z } from 'zod';

const router = Router();

// Get current user profile
router.get('/profile', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user!.uid },
      include: {
        roles: {
          include: { role: true, organization: true }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

const updateProfileSchema = z.object({
  displayName: z.string().optional(),
  preferences: z.record(z.any()).optional(),
});

// Update current user profile
router.put('/profile', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    
    const user = await prisma.user.update({
      where: { firebaseUid: req.user!.uid },
      data: {
        displayName: data.displayName !== undefined ? data.displayName : undefined,
        preferences: data.preferences !== undefined ? data.preferences : undefined
      }
    });

    res.json({ user });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update profile' });
  }
});

// Get active sessions (Mocked for now since sessions are handled by Firebase mostly)
router.get('/sessions', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    // In a real implementation we'd query Firebase Auth or a Custom Session table
    res.json({
      sessions: [
        { id: 'sess-1', device: 'iPhone 15 Pro', os: 'iOS 17.5', location: 'San Francisco, CA', current: true, lastActive: new Date().toISOString() },
        { id: 'sess-2', device: 'Chrome on Windows', os: 'Windows 11', location: 'San Francisco, CA', current: false, lastActive: new Date(Date.now() - 86400000).toISOString() }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Revoke session
router.delete('/sessions/:id', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    res.json({ success: true, message: `Session ${id} revoked` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to revoke session' });
  }
});

// Get user activity logs
router.get('/activity', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { firebaseUid: req.user!.uid } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      activity: [
        { id: '1', action: 'BALLOT_SUBMITTED', details: 'Election: 2026 Board Election', ipAddress: '192.168.1.1', createdAt: new Date(Date.now() - 3600000).toISOString() },
        { id: '2', action: 'LOGIN_SUCCESS', details: 'Device: Chrome on macOS', ipAddress: '192.168.1.1', createdAt: new Date(Date.now() - 86400000).toISOString() }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
});

export default router;
