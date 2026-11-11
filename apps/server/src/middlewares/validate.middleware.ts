import type { Request, RequestHandler } from 'express';
import type { ZodType } from 'zod';

export const validateMiddleware = (schemas: {
  body?: ZodType;
  params?: ZodType<Request['params']>;
  query?: ZodType<Request['query']>;
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
