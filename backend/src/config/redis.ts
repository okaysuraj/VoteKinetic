import Redis from 'ioredis';
import { Queue, Worker } from 'bullmq';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Main Redis Client for Caching & Rate Limiting
export const redisClient = new Redis(REDIS_URL);

// BullMQ Queue for Offline Votes & Notifications
export const backgroundQueue = new Queue('background-tasks', {
  connection: redisClient as any,
});

redisClient.on('connect', () => {
  console.log('✅ Connected to Redis successfully');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Connection Error:', err);
});
