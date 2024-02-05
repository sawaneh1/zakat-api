import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import argon2 from 'argon2';
import { CustomError } from '../Middleware/error';

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
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
        roleId:5,
      },
    });
    req.session.userId = user.id;

    res.json({ message: 'User registered successfully', user }).status(201);
  } catch (error) {
    console.error('Error registering user:', error);
    next(new CustomError('Could not register user', 500));
  }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
        username,
        },
      });
      if (!user || !(await argon2.verify(user.password, password))) {
        next(new CustomError('Could not login', 401, {reason: 'Invalid credentials'}));
        return;
      }
      req.session.userId = user.id;
      const { password: _, ...userWithoutPassword } = user;
      res.json({ message: 'User logged in successfully', data: userWithoutPassword} ).status(200);
    } catch (error) {
      console.error('Error logging in user:', error);
      next(new CustomError('Could not log in user', 500));
    }
  };



export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out user:', err);
        next(new CustomError('Could not log out user', 500));
        return;
      }
  
      res.json({ message: 'User logged out successfully' }).status(200);
    });
  };