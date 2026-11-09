import logger from '@/logger';
import { isProd } from '@base-monorepo-v2/env/server';
import type { Request, Response } from 'express';
import pinoHttp from 'pino-http';

const pinoHttpLoggerMiddleware = pinoHttp({
  logger,
  autoLogging: isProd(),
  wrapSerializers: false, // Without this, the serializers get pino's trimmed copies instead of the real req/res
  serializers: {
    req(req: Request) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        body: req.body,
        ...(req.query ? { query: req.query } : {}),
        authorization: undefined,
      };
    },
    res(res: Response) {
      return {
        status: res.statusCode,
        body: res.locals.responseBody,
      };
    },
  },
});

export default pinoHttpLoggerMiddleware;
