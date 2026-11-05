import type { ApiError } from '@/types/apiError';
import { type ErrorCode } from '@base-monorepo-v2/contracts/exceptions/codes';
import { isDev } from '@base-monorepo-v2/env/server';
import apiErrorDefinitions from './data/Errors.object';
import { serializeUnknownError } from './helpers/serializeUnknownError';

export type HttpExceptionOptions = {
  clientMessage?: string;

  /**
   * Optional error code to provide more context about the error.
   */
  code?: ErrorCode;

  /**
   * Internal log for debugging purposes. This can be a string or an object containing additional information about the error.
   * In production, Internal logs are not exposed to the client
   */
  internalLog?: string | object;

  /**
   * The underlying error that caused this exception, if applicable.
   */
  cause?: Error | unknown;

  /**
   *  Optional details to provide additional context about the error. This is usually used for validation errors
   */
  details?: Record<string, string>;
};

export class HttpException extends Error {
  status: number;
  code: ErrorCode;
  clientMessage?: string;
  internalLog?: string | object;
  cause?: unknown;
  details?: Record<string, string>;

  constructor(
    exception: keyof typeof apiErrorDefinitions,
    message: string,
    options?: HttpExceptionOptions,
  ) {
    super(message, { cause: options?.cause });
    this.status = apiErrorDefinitions[exception].status;
    this.code = options?.code ?? apiErrorDefinitions[exception].code;
    this.clientMessage = options?.clientMessage;
    this.internalLog = options?.internalLog;
    this.details = options?.details;
  }

  toResponse(originalUrl: string): ApiError {
    const apiResponse: ApiError = {
      success: false,
      message: this.message,
      code: this.code,
      clientMessage: this.clientMessage,
      timestamp: new Date(),
      path: originalUrl,
      details: this.details,
    };
    if (isDev()) {
      apiResponse.internalLog = this.internalLog;
      apiResponse.stack = this.stack;
      apiResponse.cause = serializeUnknownError(this.cause);
    }
    return apiResponse;
  }

  toLog(originalUrl: string): Record<string, unknown> {
    return {
      success: false,
      message: this.message,
      code: this.code,
      clientMessage: this.clientMessage,
      timestamp: new Date(),
      path: originalUrl,
      details: this.details,
      internalLog: this.internalLog,
      stack: this.stack,
      cause: serializeUnknownError(this.cause),
    };
  }
}
