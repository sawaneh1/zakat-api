import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error";


declare module 'express-session' {
    interface SessionData {
      userId?: number; 
    }
  }
export const authorization = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      const error = new CustomError('Unauthorized', 401, {reason: 'Please login to access the system'});
      next(error);
    }
  };