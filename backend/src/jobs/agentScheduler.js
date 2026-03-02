import cron from 'node-cron';
import { query } from '../config/db.js';
import { runAutonomousCycle } from '../services/agentService.js';

export function startAgentScheduler() {
  cron.schedule('*/30 * * * *', async () => {
    const users = await query('SELECT id FROM users WHERE role = $1 OR role = $2 LIMIT 20', ['user', 'admin']);
    for (const user of users.rows) {
      await runAutonomousCycle({ userId: user.id });
    }
  });
}
