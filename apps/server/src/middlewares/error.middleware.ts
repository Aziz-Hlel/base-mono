import { AppError } from '@/errors/appError';
import ErrorNames from '@/errors/data/errors.names';
import { handleZodError } from '@/errors/helpers/handleZodError';
import { ErrorMapper } from '@/errors/mapper';
import type { ApiError } from '@/errors/types/apiError';
import { Prisma } from '@base-monorepo-v2/db/prisma';
import { isDev } from '@base-monorepo-v2/env/server';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const globalErrorHandler = (error: Error, req: Request, res: Response<ApiError>, _: NextFunction) => {
  // Zod validation errors
  if (error instanceof ZodError) {
    const apiError = handleZodError(error, req);
    // logger.warn({ err: { ...error, message: JSON.parse(error.message) }, path }, 'Validation error');
    return res.status(400).json(apiError);
  }

  // Business logic errors
  if (error instanceof AppError) {
    // const serializedCause = error.cause ? serializeUnknownError(error.cause) : undefined;
    // logger.warn({ error, path, cause: serializedCause }, 'Application error');
    return res.status(error.status).json(AppError.toApiErrorResponse(error, req));
  }

  // Database errors
  if (
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    // logger.error(
    //   { err: error, path },
    //   'Database error : If you see this, it means that the error was not caught by the repo layer',
    // );

    const errorResponse = ErrorMapper.toResponse(
      {
        message: isDev() ? 'Database operation failed' : 'Operation failed',
        internalLog: 'Database operation failed',
        name: ErrorNames.INTERNAL_SERVER,
        status: 500,
        stack: error.stack,
        cause: error.cause,
      },
      req,
    );

    return res.status(400).json(errorResponse);
  }

  // Default 500
  // logger.fatal({ err: error, path }, 'Unhandled error');
  const errorResponse = ErrorMapper.toResponse(
    {
      message: 'Internal server error',
      name: ErrorNames.INTERNAL_SERVER,
      status: 500,
      stack: error.stack,
      cause: error.cause,
    },
    req,
  );
  return res.status(500).json(errorResponse);
};
