import type { SucessResponseParams } from '@/types/express';
import type { RequestHandler } from 'express';

export const responseEnvelope: RequestHandler = (_, res, next) => {
  res.success = function <T>(params: SucessResponseParams<T>) {
    const { status, ...payload } = params;
    return this.status(status).json({ success: true, ...payload });
  };
  next();
};
