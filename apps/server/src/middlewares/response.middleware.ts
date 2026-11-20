import type { SucessResponseParams } from '@/types/express';
import type { RequestHandler } from 'express';

export const responseEnvelope: RequestHandler = (_, res, next) => {
  res.success = function <T>(params: SucessResponseParams<T>) {
    // * was this way when you were using it now you switch to type res.json directl wit the help of defineRoute
    // * so just migrate those left using this before removing it compeletly
    // const { status, ...payload } = params;
    // const statusValue = status ?? 200;
    // return this.status(statusValue).json({ success: true, ...payload });

    const statusValue = 200;
    return this.status(statusValue).json({ success: true, ...params });
  };
  next();
};
