import { query } from '../config/db.js';

export async function listUsers() {
  const result = await query('SELECT id, email, role, full_name, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
}

export async function getUserProfile(userId) {
  const result = await query(
    `SELECT u.id, u.email, u.full_name, u.role, up.age, up.sex, up.height_cm, up.weight_kg, up.goal, up.activity_level
     FROM users u
     LEFT JOIN user_profiles up ON up.user_id = u.id
     WHERE u.id = $1`,
    [userId]
  );
  return result.rows[0];
}

export async function upsertUserProfile(userId, payload) {
  const { age, sex, heightCm, weightKg, goal, activityLevel } = payload;
  const result = await query(
    `INSERT INTO user_profiles (user_id, age, sex, height_cm, weight_kg, goal, activity_level)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (user_id)
     DO UPDATE SET age = EXCLUDED.age, sex = EXCLUDED.sex, height_cm = EXCLUDED.height_cm,
                   weight_kg = EXCLUDED.weight_kg, goal = EXCLUDED.goal, activity_level = EXCLUDED.activity_level,
                   updated_at = NOW()
     RETURNING *`,
    [userId, age, sex, heightCm, weightKg, goal, activityLevel]
  );
  return result.rows[0];
}
