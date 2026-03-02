import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { startAgentScheduler } from './jobs/agentScheduler.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/v1', routes);
app.use(errorHandler);

app.listen(env.port, () => {
  startAgentScheduler();
  console.log(`API running on ${env.port}`);
});
