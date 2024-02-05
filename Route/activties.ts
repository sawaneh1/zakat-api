// yourActivitiesRoutes.ts

import express from 'express';
import {
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getActivities,
} from '../Controller/ActivvitiesController';

const router = express.Router();

router.post('/create', createActivity);
router.get('/:activityId', getActivity);
router.patch('/:activityId/update', updateActivity);
router.delete('/:activityId/delete', deleteActivity);
router.get('/', getActivities);

export default router;
