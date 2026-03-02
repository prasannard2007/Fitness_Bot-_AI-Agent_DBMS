import * as workoutService from '../services/workoutService.js';

export async function listWorkouts(req, res, next) {
  try {
    const data = await workoutService.listWorkouts(req.user.sub);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function createWorkout(req, res, next) {
  try {
    const workout = await workoutService.createWorkout(req.user.sub, req.body);
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
}
