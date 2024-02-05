import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';

export const createZakatItem = async (req: Request, res: Response, next: NextFunction) => {
  const { name, quantity, categoryId, nisab_threshold, rate, updatedById } = req.body;

  try {
    if (!name || !categoryId || !nisab_threshold || !rate || !updatedById) {
      throw new CustomError('Invalid input data', 400);
    }

    const zakatItem = await prisma.zakatItem.create({
      data: {
        name,
        quantity,
        categoryId,
        nisab_threshold,
        rate,
        updatedById,
      },
      include: {
        category: true,
        updatedByUser: true,
      },
    });

    res.json({ message: 'ZakatItem created successfully', zakatItem }).status(201);
  } catch (error) {
    console.error('Error creating ZakatItem:', error);
    next(new CustomError('Could not create ZakatItem', 500));
  }
};

export const getZakatItem = async (req: Request, res: Response, next: NextFunction) => {
  const zakatItemId = parseInt(req.params.zakatItemId, 10);

  try {
    const zakatItem = await prisma.zakatItem.findUnique({
      where: { id: zakatItemId },
      include: {
        category: true,
        updatedByUser: true,
      },
    });
    if (!zakatItem) {
      res.json(new CustomError('ZakatItem not found', 404));
    }

    res.json({ message: 'ZakatItem retrieved successfully', zakatItem }).status(200);
  } catch (error) {
    console.error('Error retrieving ZakatItem:', error);
    next(new CustomError('Could not retrieve ZakatItem', 500));
  }
};

export const updateZakatItem = async (req: Request, res: Response, next: NextFunction) => {
  const zakatItemId = parseInt(req.params.zakatItemId, 10);
  const { name, quantity, categoryId, nisab_threshold, rate, updatedById } = req.body;

  try {
    if (!name || !quantity || !categoryId || !nisab_threshold || !rate || !updatedById) {
      throw new CustomError('Invalid input data', 400);
    }

    const updatedZakatItem = await prisma.zakatItem.update({
      where: { id: zakatItemId },
      data: {
        name,
        quantity,
        categoryId,
        nisab_threshold,
        rate,
        updatedById,
      },
      include: {
        category: true,
        updatedByUser: true,
      },
    });

    res.json({ message: 'ZakatItem updated successfully', updatedZakatItem }).status(200);
  } catch (error) {
    console.error('Error updating ZakatItem:', error);
    next(new CustomError('Could not update ZakatItem', 500));
  }
};

export const deleteZakatItem = async (req: Request, res: Response, next: NextFunction) => {
  const zakatItemId = parseInt(req.params.zakatItemId, 10);

  try {
    await prisma.zakatItem.delete({
      where: { id: zakatItemId },
    });

    res.json({ message: 'ZakatItem deleted successfully' }).status(200);
  } catch (error) {
    console.error('Error deleting ZakatItem:', error);
    next(new CustomError('Could not delete ZakatItem', 500));
  }
};

export const getZakatItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zakatItems = await prisma.zakatItem.findMany({
      include: {
        category: true,
        updatedByUser: true,
      },
    });

    res.json({ message: 'ZakatItems retrieved successfully', zakatItems }).status(200);
  } catch (error) {
    console.error('Error retrieving ZakatItems:', error);
    next(new CustomError('Could not retrieve ZakatItems', 500));
  }
};
