import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../Middleware/error';

const prisma = new PrismaClient();

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, type, accountId, userId, zakatId, donationId, goldInventoryId, silverInventoryId, animalInventoryId, nonMonetaryAssetId } = req.body;

  try {
    if (!amount || !type || !accountId) {
      throw new CustomError('Invalid input data', 400);
    }
    
   await prisma.transaction.create({
      data: {
        amount,
        type,
        account: {
          connect: { id: accountId },
        },
        user: userId ? { connect: { id: userId } } : undefined,
        zakat: zakatId ? { connect: { id: zakatId } } : undefined,
        donation: donationId ? { connect: { id: donationId } } : undefined,
        goldInventory: goldInventoryId ? { connect: { id: goldInventoryId } } : undefined,
        silverInventory: silverInventoryId ? { connect: { id: silverInventoryId } } : undefined,
        animalInventory: animalInventoryId ? { connect: { id: animalInventoryId } } : undefined,
        nonMonetaryAsset: nonMonetaryAssetId ? { connect: { id: nonMonetaryAssetId } } : undefined,
      },
    });

     return {status: true, data:'transaction stored!' }
  } catch (error) {
    console.error('Error creating Transaction:', error);
    next(new CustomError('Could not create Transaction', 500));
  }
};
