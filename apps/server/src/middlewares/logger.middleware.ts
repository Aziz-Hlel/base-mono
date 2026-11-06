import { isProd } from '@base-monorepo-v2/env/server';
import type { Request, Response } from 'express';
import { pino } from 'pino';
import pinoHttp from 'pino-http';

const httpLogger = pino({
  level: isProd() ? 'info' : 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,

  base: { pid: false }, // optional: remove pid from logs if you like
  redact: {
    censor: (value, path) => {
      if (
        ['req.authorization', 'req.headers.cookie', 'req.body.password'].includes(path.join('.'))
      ) {
        if (typeof value === 'undefined') return 'none';
        return '***';
      }
      return value;
    },
    paths: ['req.authorization', 'req.headers.cookie', 'req.body.password'],
  },
  transport: !isProd()
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          singleLine: true,
          messageFormat: '{msg}',
        },
      }
    : undefined,
});

const pinoHttpMiddleware = pinoHttp({
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

export default pinoHttpMiddleware;
