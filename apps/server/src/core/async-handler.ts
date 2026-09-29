import type { NextFunction, RequestHandler, Response } from 'express';

export const asyncHandler = (fn: (req: any, res: Response, next: NextFunction) => Promise<void>): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
