import { NextFunction, Request, Response } from 'express';

class CustomError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode = 500, details?: any) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction | null
) => {
  res.status(err.statusCode || 500).json({
    error: {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      details: err.details || null, 
    },
  });
};

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const notFoundError = new CustomError('Not Found', 404);
  next(notFoundError);
};

export { CustomError, errorHandler, notFoundHandler };
