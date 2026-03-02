import * as userService from '../services/userService.js';

export async function listUsers(req, res, next) {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req, res, next) {
  try {
    const profile = await userService.getUserProfile(req.user.sub);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

export async function upsertProfile(req, res, next) {
  try {
    const profile = await userService.upsertUserProfile(req.user.sub, req.body);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}
