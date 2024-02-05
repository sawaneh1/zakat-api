// yourController.ts
import { NextFunction, Request, Response } from 'express';
import prisma from '../config/db';
import { CustomError } from '../Middleware/error';
import { Prisma } from '@prisma/client';
import argon2 from 'argon2';

export const addZakatUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, username, password, phone } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        phone,
        roleId: 4,
      },
    });
    req.session.userId = user.id;

    res.json({ message: 'User added successfully', user }).status(201);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(new CustomError('Could not create user', 422, {reason : 'Email and username must be unique.'}));
      } else {
          next(new CustomError('Could not create user', 101, {reason:'Something went wrong!!!'}));
      }
    } else {
      next(new CustomError('Could not create user', 500, {reason:'Error creating user'}));
    }
  }
};



export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        phone: true,

      },
    });

    res.json({ message: 'success', users }).status(200);
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw new CustomError('Could not retrieve users', 500);
  }
};


export const assignRoleToUser = async (req: Request, res: Response) => {
  const { userId, roleId } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: {
        role: {
          connect: { id: parseInt(roleId, 10) },
        },
      },
    });

    res.json({ message: 'Role assigned to user successfully', updatedUser }).status(200);
  } catch (error) {
    console.error('Error assigning role to user:', error);
    throw new CustomError('Could not assign role to user', 500);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.userId, 10);
  const { name, email, username, phone, roleId } = req.body;

  try {
    if (!name || !email || !username || !phone || !roleId) {
      throw new CustomError('Invalid input data', 400);
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        username,
        phone,
        roleId,
      },
      include: {
        role: true,
      },
    });

    res.json({ message: 'User updated successfully', updatedUser }).status(200);
  } catch (error) {
    console.error('Error updating User:', error);
    next(new CustomError('Could not update User', 500));
  }
};
