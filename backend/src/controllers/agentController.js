import { runAutonomousCycle } from '../services/agentService.js';

export async function runCycle(req, res, next) {
  try {
    const userId = req.body.userId || req.user.sub;
    const plan = await runAutonomousCycle({ userId });
    res.json({ status: 'ok', plan });
  } catch (error) {
    next(error);
  }
}
