import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

function createResourceRouter(model: Model<any>): Router {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const resources = await model.find().lean();
      response.json(resources);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export const usersRouter = createResourceRouter(User);
export const teamsRouter = createResourceRouter(Team);
export const activitiesRouter = createResourceRouter(Activity);
export const leaderboardRouter = createResourceRouter(Leaderboard);
export const workoutsRouter = createResourceRouter(Workout);