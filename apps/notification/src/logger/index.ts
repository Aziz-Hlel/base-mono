import { isDev, isProd } from '@/env';
import pino from 'pino';

const logger = pino({
  level: isProd() ? 'info' : 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
  serializers: {
    error: pino.stdSerializers.err,
  },
  base: { pid: false }, // optional: remove pid from logs if you like
  transport: isDev()
    ? {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' },
      }
    : undefined,
});

export default logger;
