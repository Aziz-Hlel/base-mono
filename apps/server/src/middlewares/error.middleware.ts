import toHttpException from '@/exceptions/mapper/toHttpException';
import type { ApiError } from '@/types/api/apiError';
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

  // TODO : look into these two i think you just need one not both
  res.locals = exception.toResProdLog();
  req.log.error(exception.toReqLog(req.originalUrl), 'Error occurred:');

  return res.status(exception.status).json(payload);
};
