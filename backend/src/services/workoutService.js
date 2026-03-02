import { query } from '../config/db.js';

export async function listWorkouts(userId) {
  const result = await query(
    `SELECT w.id, w.name, w.calories_burned, w.duration_minutes, w.intensity, w.scheduled_for,
            array_remove(array_agg(we.exercise_name), NULL) AS exercises
     FROM workouts w
     LEFT JOIN workout_exercises we ON we.workout_id = w.id
     WHERE w.user_id = $1
     GROUP BY w.id
     ORDER BY w.scheduled_for DESC NULLS LAST, w.created_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function createWorkout(userId, payload) {
  const { name, caloriesBurned, durationMinutes, intensity, scheduledFor, exercises = [] } = payload;
  const workout = await query(
    `INSERT INTO workouts (user_id, name, calories_burned, duration_minutes, intensity, scheduled_for)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, name, caloriesBurned, durationMinutes, intensity, scheduledFor]
  );

  for (const exerciseName of exercises) {
    await query('INSERT INTO workout_exercises (workout_id, exercise_name) VALUES ($1, $2)', [workout.rows[0].id, exerciseName]);
  }
  return workout.rows[0];
}
