// yourHelpRequestController.ts

import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';

export const createHelpRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { requestDetails, reason, userId } = req.body;

  try {
    // Validate input data
    if (!requestDetails || !userId) {
      throw new CustomError('Invalid input data', 400);
    }

    // Create a new HelpRequest record
    const helpRequest = await prisma.helpRequest.create({
      data: {
        requestDetails,
        reason,
        approvalStatus: false, // Assuming it starts as not approved
        postingDate: new Date(),
        userId,
      },
      include: {
        user: true,
      },
    });

    // Send success response
    res.json({ message: 'HelpRequest created successfully', helpRequest }).status(201);
  } catch (error) {
    console.error('Error creating HelpRequest:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not create HelpRequest', 500));
    }
  }
};

export const getHelpRequest = async (req: Request, res: Response, next: NextFunction) => {
  const helpRequestId = parseInt(req.params.helpRequestId, 10);

  try {
    // Fetch a specific HelpRequest record by ID
    const helpRequest = await prisma.helpRequest.findUnique({
      where: { id: helpRequestId },
      include: {
        user: true,
      },
    });

    // Check if the HelpRequest record exists
    if (!helpRequest) {
      throw new CustomError('HelpRequest not found', 404);
    }

    // Send success response
    res.json({ message: 'HelpRequest retrieved successfully', helpRequest }).status(200);
  } catch (error) {
    console.error('Error retrieving HelpRequest:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve HelpRequest', 500));
    }
  }
};

export const updateHelpRequest = async (req: Request, res: Response, next: NextFunction) => {
  const helpRequestId = parseInt(req.params.helpRequestId, 10);
  const { requestDetails, reason, approvalStatus } = req.body;

  try {
    // Validate input data
    if (!requestDetails) {
      throw new CustomError('Invalid input data', 400);
    }

    // Update a specific HelpRequest record by ID
    const updatedHelpRequest = await prisma.helpRequest.update({
      where: { id: helpRequestId },
      data: {
        requestDetails,
        reason,
        approvalStatus,
      },
      include: {
        user: true,
      },
    });

    // Send success response
    res.json({ message: 'HelpRequest updated successfully', updatedHelpRequest }).status(200);
  } catch (error) {
    console.error('Error updating HelpRequest:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not update HelpRequest', 500));
    }
  }
};

export const deleteHelpRequest = async (req: Request, res: Response, next: NextFunction) => {
  const helpRequestId = parseInt(req.params.helpRequestId, 10);

  try {
    // Delete a specific HelpRequest record by ID
    await prisma.helpRequest.delete({
      where: { id: helpRequestId },
    });

    // Send success response
    res.json({ message: 'HelpRequest deleted successfully' }).status(200);
  } catch (error) {
    console.error('Error deleting HelpRequest:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not delete HelpRequest', 500));
    }
  }
};

export const getHelpRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all HelpRequest records
    const helpRequests = await prisma.helpRequest.findMany({
      include: {
        user: true,
      },
    });

    // Send success response
    res.json({ message: 'HelpRequests retrieved successfully', helpRequests }).status(200);
  } catch (error) {
    console.error('Error retrieving HelpRequests:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve HelpRequests', 500));
    }
  }
};
