import { NotFoundException } from '@/exceptions';
import { type NextFunction, type Request, type Response } from 'express';

const notFoundHandler = (req: Request, _: Response, next: NextFunction) => {
  const message = `Route ${req.method} ${req.originalUrl} not found`;
  next(new NotFoundException(message));
};

export default notFoundHandler;
