import toHttpException from '@/exceptions/mapper/toHttpException';
import type { ApiError } from '@/types/apiError';
import type { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response<ApiError>,
  next: NextFunction,
) => {
  if (res.headersSent) return next(error);
  const exception = toHttpException(error);
  const payload = exception.toResponse(req.originalUrl);
  req.log.error(exception.toReqLog(req.originalUrl), 'Error occurred:');
  console.log(exception.toResponse(req.originalUrl));
  return res.status(exception.status).json(payload);
};
