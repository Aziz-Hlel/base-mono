import type { SucessResponseParams } from '@/types/express';
import type { RequestHandler } from 'express';

export const responseEnvelope: RequestHandler = (_, res, next) => {
  res.success = function <T>(params: SucessResponseParams<T>) {
    const { status, ...payload } = params;
    const statusValue = status ?? 200;
    return this.status(statusValue).json({ success: true, ...payload });
  };
  next();
};
