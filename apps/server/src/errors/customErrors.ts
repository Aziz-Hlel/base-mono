import { AppError } from './appError';
import ERRORS, { type ErrObject } from './data/Errors.object';

const toSuperPayload = (errorObject: ErrObject, message: string, payload: AppErrorOptions) => {
  return {
    errorObject,
    message,
    clientMessage: payload.clientMessage,
    internalLog: payload.internalLog,
    cause: payload.cause,
  };
};

type AppErrorOptions = { clientMessage?: string; internalLog?: string | object; stack?: string; cause?: unknown };

export class BadRequestError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.BAD_REQUEST, message, payload));
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.UNAUTHORIZED, message, payload));
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.FORBIDDEN, message, payload));
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.NOT_FOUND, message, payload));
  }
}

export class ConflictError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.CONFLICT, message, payload));
  }
}

export class PermissionDeniedError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.PERMISSION_DENIED, message, payload));
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.DATABASE_ERROR, message, payload));
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.INTERNAL_SERVER, message, payload));
  }
}

export class NotImplementedError extends AppError {
  constructor(message: string, payload: AppErrorOptions) {
    super(toSuperPayload(ERRORS.NOT_IMPLEMENTED, message, payload));
  }
}
