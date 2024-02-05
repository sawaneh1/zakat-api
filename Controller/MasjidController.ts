// yourMasjidController.ts

import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';

export const createMasjid = async (req: Request, res: Response, next: NextFunction) => {
  const { createdBy, name, location, contactNumber, contactPerson, imam } = req.body;

  try {
    // Validate input data
    if (!createdBy || !name || !location || !contactNumber || !contactPerson || !imam) {
      throw new CustomError('Invalid input data', 400);
    }

    // Create a new Masjid record
    const mosque = await prisma.mosque.create({
      data: {
        createdBy,
        name,
        location,
        contactNumber,
        contactPerson,
        imam,
      },
      include: {
        createdByUser: true,
      },
    });

    // Send success response
    res.json({ message: 'Masjid created successfully', mosque }).status(201);
  } catch (error) {
    console.error('Error creating Masjid:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not create Masjid', 500));
    }
  }
};

export const getMasjid = async (req: Request, res: Response, next: NextFunction) => {
  const mosqueId = parseInt(req.params.mosqueId, 10);

  try {
    // Fetch a specific Masjid record by ID
    const mosque = await prisma.mosque.findUnique({
      where: { id: mosqueId },
      include: {
        createdByUser: true,
      },
    });

    // Check if the Masjid record exists
    if (!mosque) {
      throw new CustomError('Masjid not found', 404);
    }

    // Send success response
    res.json({ message: 'Masjid retrieved successfully', mosque }).status(200);
  } catch (error) {
    console.error('Error retrieving Masjid:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve Masjid', 500));
    }
  }
};

export const updateMasjid = async (req: Request, res: Response, next: NextFunction) => {
  const mosqueId = parseInt(req.params.mosqueId, 10);
  const { createdBy, name, location, contactNumber, contactPerson, imam } = req.body;

  try {
    // Validate input data
    if (!createdBy || !name || !location || !contactNumber || !contactPerson || !imam) {
      throw new CustomError('Invalid input data', 400);
    }

    // Update a specific Masjid record by ID
    const updatedMasjid = await prisma.mosque.update({
      where: { id: mosqueId },
      data: {
        createdBy,
        name,
        location,
        contactNumber,
        contactPerson,
        imam,
      },
      include: {
        createdByUser: true,
      },
    });

    // Send success response
    res.json({ message: 'Masjid updated successfully', updatedMasjid }).status(200);
  } catch (error) {
    console.error('Error updating Masjid:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not update Masjid', 500));
    }
  }
};

export const deleteMasjid = async (req: Request, res: Response, next: NextFunction) => {
  const mosqueId = parseInt(req.params.mosqueId, 10);

  try {
    // Delete a specific Masjid record by ID
    await prisma.mosque.delete({
      where: { id: mosqueId },
    });

    // Send success response
    res.json({ message: 'Masjid deleted successfully' }).status(200);
  } catch (error) {
    console.error('Error deleting Masjid:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not delete Masjid', 500));
    }
  }
};

export const getMasjids = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all Masjid records
    const mosques = await prisma.mosque.findMany({
      include: {
        createdByUser: true,
      },
    });

    // Send success response
    res.json({ message: 'Masjids retrieved successfully', mosques }).status(200);
  } catch (error) {
    console.error('Error retrieving Masjids:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve Masjids', 500));
    }
  }
};
