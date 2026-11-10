// Dev-only pino transport. Plain .mjs because pino loads it inside a worker thread, and
// functions like customPrettifiers can't be passed to a worker through the transport options.
import { inspect } from 'node:util';
import pretty from 'pino-pretty';

// inspect() prints strings containing \n as 'line\n' + 'line\n'. Wrapping them with a custom
// inspector makes stacks and other multi-line text print with real line breaks instead.
const INDENT = '  ';

const asTextBlock = (text) => ({
  [inspect.custom]: () => `\n${text.replace(/^/gm, INDENT)}`,
});

const withTextBlocks = (value) => {
  if (typeof value === 'string') return value.includes('\n') ? asTextBlock(value) : value;
  if (Array.isArray(value)) return value.map(withTextBlocks);
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withTextBlocks(v)]));
  }
  return value;
};

const likeConsoleLog = (value) => inspect(withTextBlocks(value), { colors: true, depth: null });

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
