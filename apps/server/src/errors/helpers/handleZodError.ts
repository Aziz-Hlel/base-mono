import ErrorNames from '../data/errors.names';
import { ErrorMapper } from '../mapper';
import type { Request } from 'express';
import { prettifyError, ZodError } from 'zod';

export const handleZodError = (error: ZodError<unknown>, req: Request) => {
  const formatted: Record<string, string> = {};

  for (const issue of error.issues) {
    const path = issue.path.join('.');
    formatted[path] = issue.message;
  }
  // prettifyError(error);

  const errorResponse = ErrorMapper.toResponseWithDetails(
    {
      message: 'Validation failed',
      name: ErrorNames.BAD_REQUEST,
      status: 400,
      cause: error.cause,
      stack: error.stack,
      details: { 'Zod Error': prettifyError(error) },
    },
    req,
  );

  return errorResponse;
};
