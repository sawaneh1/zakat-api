
import {  NextFunction, Request, Response } from 'express';
import { notFoundHandler } from '.';


const  NotFoundError  = (req: Request, res: Response, next:NextFunction) => {
        notFoundHandler(req, res, next);
      };


export default NotFoundError;

