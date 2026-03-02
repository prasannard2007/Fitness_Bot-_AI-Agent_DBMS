INSERT INTO users (id, email, password_hash, full_name, role)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@fitbot.ai', '$2a$10$abcdefghijklmnopqrstuv', 'Platform Admin', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'user@fitbot.ai', '$2a$10$abcdefghijklmnopqrstuv', 'Demo User', 'user');

INSERT INTO user_profiles (user_id, age, sex, height_cm, weight_kg, goal, activity_level)
VALUES ('22222222-2222-2222-2222-222222222222', 29, 'female', 167, 63, 'fat_loss', 'high');

INSERT INTO workouts (user_id, name, calories_burned, duration_minutes, intensity)
VALUES ('22222222-2222-2222-2222-222222222222', 'HIIT Intervals', 420, 35, 'high');
