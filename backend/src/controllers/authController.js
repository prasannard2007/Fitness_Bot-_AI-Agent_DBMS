import { loginSchema, registerSchema } from '../validators/authValidator.js';
import * as authService from '../services/authService.js';

export async function register(req, res, next) {
  try {
    const payload = await registerSchema.validateAsync(req.body);
    const user = await authService.register(payload);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const payload = await loginSchema.validateAsync(req.body);
    const session = await authService.login(payload);
    res.json(session);
  } catch (error) {
    next(error);
  }
}
