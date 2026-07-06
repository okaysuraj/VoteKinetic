import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { prisma } from '../db/prisma';

const router = Router();

// Sync Firebase user to local PostgreSQL database
router.post('/sync', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { uid, email } = req.user!;
    
    // Find or create user
    const user = await prisma.user.upsert({
      where: { firebaseUid: uid },
      update: {
        email: email || '',
      },
      create: {
        firebaseUid: uid,
        email: email || '',
      }
    });

    res.json({ message: 'User synced', user });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
