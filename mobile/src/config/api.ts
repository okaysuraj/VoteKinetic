import { Platform } from 'react-native';

/**
 * Centralized API configuration for the VoteKinetic mobile app.
 * 
 * All screens MUST import API_URL from this file instead of
 * constructing URLs directly. This ensures consistency across
 * the entire app.
 * 
 * Priority:
 * 1. EXPO_PUBLIC_API_URL environment variable (set in .env or app.config)
 * 2. Platform-specific localhost fallback
 */
export const API_URL: string =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api');

/**
 * App-wide configuration constants.
 */
export const config = {
  /** Base API URL */
  apiUrl: API_URL,

  /** Polling intervals (milliseconds) */
  polling: {
    dashboard: 30_000,       // 30 seconds
    liveMetrics: 5_000,      // 5 seconds
    auditLedger: 3_000,      // 3 seconds
    notifications: 60_000,   // 1 minute
  },

  /** Pagination defaults */
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },

  /** Voting token expiry (milliseconds) */
  votingTokenExpiry: 15 * 60 * 1000, // 15 minutes
} as const;
