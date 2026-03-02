import { query } from '../config/db.js';

export const toolset = {
  async getUserContext({ userId }) {
    const [profile, recentWorkouts] = await Promise.all([
      query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]),
      query('SELECT name, duration_minutes, intensity, scheduled_for FROM workouts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5', [userId])
    ]);
    return { profile: profile.rows[0] || null, recentWorkouts: recentWorkouts.rows };
  },

  async createWorkoutPlan({ userId, title, planJson }) {
    const result = await query('INSERT INTO ai_plans (user_id, title, plan_payload) VALUES ($1, $2, $3) RETURNING *', [userId, title, planJson]);
    return result.rows[0];
  },

  async createReminder({ userId, reminderType, scheduleCron, payload }) {
    const result = await query(
      'INSERT INTO reminders (user_id, reminder_type, schedule_cron, payload, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, reminderType, scheduleCron, payload, 'active']
    );
    return result.rows[0];
  }
};

export async function runAutonomousCycle({ userId }) {
  const context = await toolset.getUserContext({ userId });
  const recommendation = {
    focus: 'progressive_overload',
    weeklyTarget: context.profile?.goal || 'general_fitness',
    generatedAt: new Date().toISOString()
  };
  await toolset.createWorkoutPlan({ userId, title: 'Adaptive AI Plan', planJson: recommendation });
  await toolset.createReminder({ userId, reminderType: 'workout', scheduleCron: '0 7 * * *', payload: { message: 'Morning workout check-in' } });
  return recommendation;
}
