import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redis } from '../db/redis';

// Limit voting operations to 10 requests per minute
export const voteRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error - Known issue with rate-limit-redis types and ioredis
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  message: { error: 'Too many voting requests, please try again later.' }
});

// Limit general API operations to 100 requests per minute
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  message: { error: 'Too many requests, please try again later.' }
});
