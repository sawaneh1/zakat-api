// yourActivitiesController.ts

import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';

export const createActivity = async (req: Request, res: Response, next: NextFunction) => {
  const { timestamp, userId, description } = req.body;

  try {
    // Validate input data
    if (!timestamp || !userId || !description) {
      throw new CustomError('Invalid input data', 400);
    }

    // Create a new Activity record
    const activity = await prisma.activity.create({
      data: {
        timestamp,
        userId,
        description,
      },
      include: {
        user: true,
      },
    });

    // Send success response
    res.json({ message: 'Activity created successfully', activity }).status(201);
  } catch (error) {
    console.error('Error creating Activity:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not create Activity', 500));
    }
  }
};

export const getActivity = async (req: Request, res: Response, next: NextFunction) => {
  const activityId = parseInt(req.params.activityId, 10);

  try {
    // Fetch a specific Activity record by ID
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: {
        user: true,
      },
    });

    // Check if the Activity record exists
    if (!activity) {
      throw new CustomError('Activity not found', 404);
    }

    // Send success response
    res.json({ message: 'Activity retrieved successfully', activity }).status(200);
  } catch (error) {
    console.error('Error retrieving Activity:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve Activity', 500));
    }
  }
};

export const updateActivity = async (req: Request, res: Response, next: NextFunction) => {
  const activityId = parseInt(req.params.activityId, 10);
  const { timestamp, userId, description } = req.body;

  try {
    // Validate input data
    if (!timestamp || !userId || !description) {
      throw new CustomError('Invalid input data', 400);
    }

    // Update a specific Activity record by ID
    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        timestamp,
        userId,
        description,
      },
      include: {
        user: true,
      },
    });

    // Send success response
    res.json({ message: 'Activity updated successfully', updatedActivity }).status(200);
  } catch (error) {
    console.error('Error updating Activity:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not update Activity', 500));
    }
  }
};

export const deleteActivity = async (req: Request, res: Response, next: NextFunction) => {
  const activityId = parseInt(req.params.activityId, 10);

  try {
    // Delete a specific Activity record by ID
    await prisma.activity.delete({
      where: { id: activityId },
    });

    // Send success response
    res.json({ message: 'Activity deleted successfully' }).status(200);
  } catch (error) {
    console.error('Error deleting Activity:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not delete Activity', 500));
    }
  }
};

export const getActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all Activity records
    const activities = await prisma.activity.findMany({
      include: {
        user: true,
      },
    });

    // Send success response
    res.json({ message: 'Activities retrieved successfully', activities }).status(200);
  } catch (error) {
    console.error('Error retrieving Activities:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve Activities', 500));
    }
  }
};
