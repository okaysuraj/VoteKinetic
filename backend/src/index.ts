import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from './config/redis';

import authRoutes from './routes/auth.routes';
import electionRoutes from './routes/election.routes';
import voteRoutes from './routes/vote.routes';
import adminRoutes from './routes/admin.routes';
import tallyRoutes from './routes/tally.routes';
import userRoutes from './routes/user.routes';
import organizationRoutes from './routes/organization.routes';
import platformSettingsRoutes from './routes/platformSettings.routes';
import notificationRoutes from './routes/notification.routes';
import systemRoutes from './routes/system.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Apply Rate Limiting powered by Redis
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(args[0], ...args.slice(1)) as any,
  }),
});

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Register Routes
app.use('/api/users', authRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tally', tallyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/platform-settings', platformSettingsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/system', systemRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
