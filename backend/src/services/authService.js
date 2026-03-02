import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { env } from '../config/env.js';
import { httpError } from '../utils/httpError.js';

export async function register(payload) {
  const { email, password, fullName, role = 'user' } = payload;
  const exists = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (exists.rowCount) throw httpError(409, 'Email already exists');
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await query(
    `INSERT INTO users (email, password_hash, full_name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, role, full_name`,
    [email, passwordHash, fullName, role]
  );
  return result.rows[0];
}

export async function login(payload) {
  const { email, password } = payload;
  const userResult = await query('SELECT id, email, role, password_hash, full_name FROM users WHERE email = $1', [email]);
  if (!userResult.rowCount) throw httpError(401, 'Invalid credentials');
  const user = userResult.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw httpError(401, 'Invalid credentials');

  const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

  return { token, user: { id: user.id, email: user.email, role: user.role, fullName: user.full_name } };
}
