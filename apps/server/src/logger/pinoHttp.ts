import { httpLogger } from './logger.init';
import type { Request, Response } from 'express';
import pinoHttp from 'pino-http';

export const pinoHttpMiddleware = pinoHttp({
  logger: httpLogger,
  serializers: {
    req(req: Request) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        body: req.body,
        authorization: undefined,
      };
    },
    res(res: Response) {
      return {
        status: res.statusCode,
      };
    },
  },
});
