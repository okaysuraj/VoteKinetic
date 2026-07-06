import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let firebaseApp: admin.app.App | null = null;

try {
  // If FIREBASE_SERVICE_ACCOUNT is provided as a JSON string
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin initialized with service account.');
  } else {
    console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT not found in environment. Firebase Admin is NOT initialized.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin:', error);
}

export { firebaseApp, admin };
