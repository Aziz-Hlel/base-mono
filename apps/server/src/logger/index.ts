import { isDev, isProd } from '@base-monorepo-v2/env/server';
import pino from 'pino';
import pretty from 'pino-pretty';
import { wrapErrorLogs } from './wrapErrorLogs';

const redactedPaths = [
  'req.authorization',
  'req.headers.cookie',
  'req.body.password',
  'res.body.data.accessToken',
];

const prettyStream = pretty({
  colorize: true,
  colorizeObjects: true,
  levelFirst: true,
});

const logger = pino(
  {
    level: isProd() ? 'info' : 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    hooks: { logMethod: wrapErrorLogs },
    serializers: {
      error: pino.stdSerializers.err,
    },
    base: { pid: false }, // optional: remove pid from logs if you like
    redact: {
      censor: (value, path) => {
        if (redactedPaths.includes(path.join('.'))) {
          if (typeof value === 'undefined') return 'none';
          return '***';
        }
        return value;
      },
      paths: redactedPaths,
    },
  },

  isDev() ? prettyStream : undefined, // undefined → plain JSON to stdout in prod
);

export default logger;
