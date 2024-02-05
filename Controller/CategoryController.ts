import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { name, comment,  } = req.body;
  const updatedById = req.session.userId

  try {
    if (!name || !updatedById) {
      throw new CustomError('Invalid input data', 400);
    }

    const category = await prisma.category.create({
      data: {
        name,
        comment,
        updatedById,
      },
      include: {
        updatedByUser: true,
        zakatItem: true,
      },
    });

    res.json({ message: 'Category created successfully', category }).status(201);
  } catch (error) {
    console.error('Error creating Category:', error);
    next(new CustomError('Could not create Category', 500));
  }
};

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  const categoryId = parseInt(req.params.categoryId, 10);

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        updatedByUser: true,
        zakatItem: true,
      },
    });

    if (!category) {
      throw new CustomError('Category not found', 404);
    }

    res.json({ message: 'Category retrieved successfully', category }).status(200);
  } catch (error) {
    console.error('Error retrieving Category:', error);
    next(new CustomError('Could not retrieve Category', 500));
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const { name, comment, updatedById } = req.body;

  try {
    if (!name || !updatedById) {
      throw new CustomError('Invalid input data', 400);
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        comment,
        updatedById,
      },
      include: {
        updatedByUser: true,
        zakatItem: true,
      },
    });

    res.json({ message: 'Category updated successfully', updatedCategory }).status(200);
  } catch (error) {
    console.error('Error updating Category:', error);
    next(new CustomError('Could not update Category', 500));
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  const categoryId = parseInt(req.params.categoryId, 10);

  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });

    res.json({ message: 'Category deleted successfully' }).status(200);
  } catch (error) {
    console.error('Error deleting Category:', error);
    next(new CustomError('Could not delete Category', 500));
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        updatedByUser: true,
        zakatItem: true,
      },
    });

    res.json({ message: 'Categories retrieved successfully', categories }).status(200);
  } catch (error) {
    console.error('Error retrieving Categories:', error);
    next(new CustomError('Could not retrieve Categories', 500));
  }
};
