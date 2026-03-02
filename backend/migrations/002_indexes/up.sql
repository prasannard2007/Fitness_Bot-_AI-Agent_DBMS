CREATE INDEX idx_workouts_user_scheduled ON workouts(user_id, scheduled_for DESC);
CREATE INDEX idx_nutrition_logs_user_logged ON nutrition_logs(user_id, logged_at DESC);
CREATE INDEX idx_messages_chat_created ON messages(chat_id, created_at DESC);
CREATE INDEX idx_progress_user_date ON progress_metrics(user_id, metric_date DESC);
CREATE INDEX idx_ai_plans_user_created ON ai_plans(user_id, created_at DESC);
CREATE INDEX idx_reminders_status ON reminders(status);
CREATE INDEX idx_workout_exercises_workout ON workout_exercises(workout_id);
