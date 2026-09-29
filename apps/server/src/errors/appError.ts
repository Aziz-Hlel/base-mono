import type { ErrNames, ErrObject } from './data/Errors.object';
import ErrorNames, { type ErrorNameKeys } from './data/errors.names';
import { ErrorMapper } from './mapper';
import type { ApiError } from './types/apiError';
import type { Request } from 'express';

interface IAppError {
  errorObject: ErrObject;
  clientMessage?: string;
  message?: string;
  internalLog?: string | object;
  cause?: unknown;
}

export class AppError extends Error {
  status: number;
  name: ErrNames;
  clientMessage?: string;
  internalLog?: string | object;
  cause?: unknown;

  constructor({ errorObject, clientMessage, message, internalLog, cause }: IAppError) {
    super(message, { cause });
    this.name = errorObject.name;
    this.status = errorObject.status;
    this.clientMessage = clientMessage;
    this.internalLog = internalLog;
    this.cause = cause;
  }

  static isAppError(error: Error): error is AppError {
    return !!error.name && Object.values(ErrorNames).includes(error.name as ErrorNameKeys);
  }

  static toApiErrorResponse(error: AppError, req: Request): ApiError {
    return ErrorMapper.toResponse(req, {
      name: error.name,
      message: error.message,
      status: error.status,
      clientMessage: error.clientMessage,
      internalLog: error.internalLog,
      cause: error.cause,
      stack: error.stack,
    });
  }
}
