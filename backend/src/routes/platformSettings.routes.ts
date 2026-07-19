import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';
import { prisma } from '../db/prisma';
import { z } from 'zod';

const router = Router();

const requireSuperAdmin = requireRole(['SUPER_ADMIN']);

// GET platform settings
router.get('/', requireAuth, requireSuperAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    let settings = await prisma.platformSettings.findFirst();
    
    // If no settings exist, create defaults
    if (!settings) {
      settings = await prisma.platformSettings.create({
        data: {}
      });
    }

    res.json({ settings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch platform settings' });
  }
});

const updateSettingsSchema = z.object({
  maintenanceMode: z.boolean().optional(),
  defaultTimezone: z.string().optional(),
  auditLogRetention: z.string().optional(),
  sessionTimeoutMinutes: z.number().min(1).max(120).optional(),
  encryptionStrength: z.string().optional(),
  biometricEnforcement: z.boolean().optional(),
  ipWhitelisting: z.boolean().optional(),
  fraudDetection: z.boolean().optional(),
});

// PATCH platform settings
router.patch('/', requireAuth, requireSuperAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const data = updateSettingsSchema.parse(req.body);
    
    let settings = await prisma.platformSettings.findFirst();
    
    if (!settings) {
      settings = await prisma.platformSettings.create({ data: {} });
    }

    const updated = await prisma.platformSettings.update({
      where: { id: settings.id },
      data
    });

    res.json({ settings: updated });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update settings' });
  }
});

export default router;
