import type { Request, RequestHandler } from 'express';
import type { z, ZodType } from 'zod';

export const validateMiddleware = <
  TBody extends ZodType = z.ZodType<unknown>,
  TParams extends ZodType = z.ZodType<Request['params']>,
  TQuery extends ZodType = z.ZodType<Request['query']>,
>(schemas: {
  body?: TBody;
  params?: TParams;
  query?: TQuery;
}): RequestHandler => {
  return async (req, _res, next) => {
    try {
      if (schemas.body) req.body = await schemas.body.parseAsync(req.body);
      if (schemas.params) req.params = await schemas.params.parseAsync(req.params);
      if (schemas.query) {
        // Express 5: req.query is a getter, so plain assignment throws.
        Object.defineProperty(req, 'query', {
          value: await schemas.query.parseAsync(req.query),
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
