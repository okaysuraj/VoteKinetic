import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { prisma } from '../db/prisma';

export const requireRole = (allowedRoles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Find user and their roles
      const user = await prisma.user.findUnique({
        where: { firebaseUid: req.user.uid },
        include: {
          roles: {
            include: { role: true }
          }
        }
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found in database' });
      }

      const userRoles = user.roles.map(ur => ur.role.name);
      
      const hasPermission = userRoles.some(role => allowedRoles.includes(role));

      if (!hasPermission) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }

      // Attach full db user to request for convenience in downstream routes
      req.dbUser = user;
      next();
    } catch (error) {
      console.error('RBAC Error:', error);
      res.status(500).json({ error: 'Internal server error during authorization' });
    }
  };
};
