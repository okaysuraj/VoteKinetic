import { Request, Response, NextFunction } from 'express';
import { admin, firebaseApp } from '../config/firebase';

import { User } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
  dbUser?: User;
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  let token = '';
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split('Bearer ')[1];
  } else if (req.query.token && typeof req.query.token === 'string') {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  if (!firebaseApp) {
    console.error('Firebase Admin not initialized');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};
