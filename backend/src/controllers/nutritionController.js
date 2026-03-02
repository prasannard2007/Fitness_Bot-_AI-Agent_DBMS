import * as nutritionService from '../services/nutritionService.js';

export async function listNutrition(req, res, next) {
  try {
    const data = await nutritionService.listNutritionLogs(req.user.sub);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
