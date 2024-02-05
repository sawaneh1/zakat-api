// yourNisabController.ts

import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';

export const createNisab = async (req: Request, res: Response, next: NextFunction) => {
  console.log('req seesion', req.session);

 const {userId} = req.session
  
  const { amount, lastUpdateDate, } = req.body;

  try {
    // Validate input data
    if (!amount  || !userId) {
      throw new CustomError('Invalid input data', 400);
    }

    // Create a new Nisab record
    const nisab = await prisma.nisab.create({
      data: {
        amount,
        lastUpdateDate: new Date(),
        updatedById:userId,
      },
      include: {
        updatedByUser: true,
      },
    });

    // Send success response
    res.json({ message: 'Nisab created successfully', nisab }).status(201);
  } catch (error) {
    console.error('Error creating Nisab:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not create Nisab', 500));
    }
  }
};

export const getNisab = async (req: Request, res: Response, next: NextFunction) => {
  const nisabId = parseInt(req.params.nisabId, 10);

  try {
    // Fetch a specific Nisab record by ID
    const nisab = await prisma.nisab.findUnique({
      where: { id: nisabId },
      include: {
        updatedByUser: true,
      },
    });

    // Check if the Nisab record exists
    if (!nisab) {
      throw new CustomError('Nisab not found', 404);
    }

    // Send success response
    res.json({ message: 'Nisab retrieved successfully', nisab }).status(200);
  } catch (error) {
    console.error('Error retrieving Nisab:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve Nisab', 500));
    }
  }
};

export const updateNisab = async (req: Request, res: Response, next: NextFunction) => {
  const nisabId = parseInt(req.params.nisabId, 10);
  const { amount, lastUpdateDate, updatedById } = req.body;

  try {
    // Validate input data
    if (!amount || !lastUpdateDate || !updatedById) {
      throw new CustomError('Invalid input data', 400);
    }

    // Update a specific Nisab record by ID
    const updatedNisab = await prisma.nisab.update({
      where: { id: nisabId },
      data: {
        amount,
        lastUpdateDate,
        updatedById,
      },
      include: {
        updatedByUser: true,
      },
    });

    // Send success response
    res.json({ message: 'Nisab updated successfully', updatedNisab }).status(200);
  } catch (error) {
    console.error('Error updating Nisab:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not update Nisab', 500));
    }
  }
};

export const deleteNisab = async (req: Request, res: Response, next: NextFunction) => {
  const nisabId = parseInt(req.params.nisabId, 10);

  try {
    // Delete a specific Nisab record by ID
    await prisma.nisab.delete({
      where: { id: nisabId },
    });

    // Send success response
    res.json({ message: 'Nisab deleted successfully' }).status(200);
  } catch (error) {
    console.error('Error deleting Nisab:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not delete Nisab', 500));
    }
  }
};

export const getNisabs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all Nisab records
    const nisabs = await prisma.nisab.findMany({
      include: {
        updatedByUser: true,
      },
    });

    // Send success response
    res.json({ message: 'Nisabs retrieved successfully', nisabs }).status(200);
  } catch (error) {
    console.error('Error retrieving Nisabs:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve Nisabs', 500));
    }
  }
};
