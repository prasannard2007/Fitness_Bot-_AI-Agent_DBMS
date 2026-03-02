import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as userController from '../controllers/userController.js';
import * as workoutController from '../controllers/workoutController.js';
import * as nutritionController from '../controllers/nutritionController.js';
import * as agentController from '../controllers/agentController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.get('/users', authenticate, authorize('admin'), userController.listUsers);
router.get('/users/me/profile', authenticate, userController.getProfile);
router.put('/users/me/profile', authenticate, userController.upsertProfile);

router.get('/workouts', authenticate, workoutController.listWorkouts);
router.post('/workouts', authenticate, workoutController.createWorkout);

router.get('/nutrition-logs', authenticate, nutritionController.listNutrition);

router.post('/agent/run-cycle', authenticate, authorize('admin', 'ai_agent'), agentController.runCycle);

export default router;
