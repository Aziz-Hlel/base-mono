import { isProd } from '@base-monorepo-v2/env/server';
import pino, { type LogFn, type Logger } from 'pino';

/**
 * Pino `hooks.logMethod`: nests the object passed to every `.error()` call under `exception`.
 * String-only calls and other log levels pass through untouched.
 */
export function wrapErrorLogs(
  this: Logger,
  args: Parameters<LogFn>,
  method: LogFn,
  level: number,
): void {
  const [first, ...rest] = args as unknown[];
  const fromRequest = 'req' in this.bindings();

  if (!fromRequest || isProd() || level !== pino.levels.values.error) {
    method.apply(this, args);
    return;
  }

  if (typeof first !== 'object' || first === null) {
    method.apply(this, args);
    return;
  }

  // Pino only serializes Errors at the top level, nested ones would be logged as {}
  const isError = first instanceof Error;
  const exception = isError ? pino.stdSerializers.err(first) : first;
  const messageArgs = isError && rest.length === 0 ? [first.message] : rest;

  method.apply(this, [{ exception }, ...messageArgs] as Parameters<LogFn>);
}
