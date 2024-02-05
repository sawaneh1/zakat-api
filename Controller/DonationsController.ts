// yourDonationController.ts
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';

export const createDonation = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, donationDate, comment, userId } = req.body;

  try {
    // Validate the input data
    if (!amount || !donationDate || !userId) {
      throw new CustomError('Invalid input data', 400);
    }

    const donation = await prisma.donation.create({
      data: {
        amount,
        donationDate,
        comment,
        userId,
      },
  
      include: {
        user: true,
      },
    });

    // Send success response
    res.json({ message: 'Donation created successfully', donation }).status(201);
  } catch (error) {
    console.error('Error creating Donation:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not create Donation', 500));
    }
  }
};

export const getDonation = async (req: Request, res: Response, next: NextFunction) => {
  const donationId = parseInt(req.params.donationId, 10);

  try {
    // Fetch Donation record by ID
    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      include: {
        // include related entities if needed
        user: true,
      },
    });

    // Check if Donation exists
    if (!donation) {
      throw new CustomError('Donation not found', 404);
    }

    // Send success response
    res.json({ message: 'Donation retrieved successfully', donation }).status(200);
  } catch (error) {
    console.error('Error retrieving Donation:', error);
    // Handle known errors
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Handle unknown errors
      next(new CustomError('Could not retrieve Donation', 500));
    }
  }
};


export const getAllDonations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const donations = await prisma.donation.findMany({
        include: {
          user: true,
        },
      });
  
      // Send success response
      res.json({ message: 'Donations retrieved successfully', donations }).status(200);
    } catch (error) {
      console.error('Error retrieving Donations:', error);

      if (error instanceof CustomError) {
        next(error);
      } else {
       
        next(new CustomError('Could not retrieve Donations', 500));
      }
    }
  };
  
  