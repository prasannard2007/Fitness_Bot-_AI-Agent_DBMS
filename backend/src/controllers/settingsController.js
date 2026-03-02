import * as settingsService from '../services/settingsService.js';

export async function getSettings(req, res, next) {
  try {
    const data = await settingsService.getIntegrationSettings(req.user.sub);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function saveSettings(req, res, next) {
  try {
    const data = await settingsService.upsertIntegrationSettings(req.user.sub, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function addRequirement(req, res, next) {
  try {
    const requirement = await settingsService.createRequirement(req.user.sub, req.body);
    res.status(201).json(requirement);
  } catch (error) {
    next(error);
  }
}

export async function listRequirements(req, res, next) {
  try {
    const requirements = await settingsService.listRequirements(req.user.sub);
    res.json(requirements);
  } catch (error) {
    next(error);
  }
}
