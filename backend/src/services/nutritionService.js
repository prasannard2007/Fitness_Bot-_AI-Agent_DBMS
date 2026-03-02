import { query } from '../config/db.js';

export async function listNutritionLogs(userId) {
  const result = await query(
    'SELECT id, meal_type, food_items, calories_intake, logged_at FROM nutrition_logs WHERE user_id = $1 ORDER BY logged_at DESC',
    [userId]
  );
  return result.rows;
}
