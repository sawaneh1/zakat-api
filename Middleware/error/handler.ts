import { NextFunction, Request, Response } from "express";
import { CustomError, errorHandler } from ".";

 export const mainError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    errorHandler(err, req, res, next);
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
 }
