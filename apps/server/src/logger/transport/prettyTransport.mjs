// Dev-only pino transport. Plain .mjs because pino loads it inside a worker thread, and
// functions like customPrettifiers can't be passed to a worker through the transport options.
import { inspect } from 'node:util';
import pretty from 'pino-pretty';

const likeConsoleLog = (value) => inspect(value, { colors: true, depth: null });

export default () =>
  pretty({
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
    customPrettifiers: {
      req: likeConsoleLog,
      res: likeConsoleLog,
      exception: likeConsoleLog,
    },
  });
