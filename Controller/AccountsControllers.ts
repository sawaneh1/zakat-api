import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    console.log('reeeeeg', req.body);
    
  const { name, balance } = req.body;

  

  try {
    if (!name || balance != '') {
        console.log('okay,,,,');
        
      throw new CustomError('Invalid input data', 400);
    }

    const account = await prisma.account.create({
      data: {
        name,
        balance,
      },
    });

    res.json({ message: 'Account created successfully', account }).status(201);
  } catch (error) {
    console.error('Error creating Account:', error);
    next(new CustomError('Could not create Account', 500));
  }
};
