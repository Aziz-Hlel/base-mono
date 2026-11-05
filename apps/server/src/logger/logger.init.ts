import { isProd } from '@base-monorepo-v2/env/server';
import pino from 'pino';

export const logger = pino({
  level: isProd() ? 'info' : 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: {
    error: pino.stdSerializers.err,
  },
  base: { pid: false }, // optional: remove pid from logs if you like
  transport: isProd()
    ? {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' },
      }
    : undefined,
});

export const httpLogger = pino({
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
