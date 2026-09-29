import type { ErrNames } from '../data/Errors.object';
import type { ApiError } from '../types/apiError';
import { isDev } from '@base-monorepo-v2/env/server';
import type { Request } from 'express';

export class ErrorMapper {
  static toResponse(
    req: Request,
    error: {
      message: string;
      status: number;
      name: ErrNames;
      clientMessage?: string;
      internalLog?: string | object;
      cause?: unknown;
      stack?: string;
    },
  ): ApiError {
    const apiResponse: ApiError = {
      success: false,
      message: error.message,
      timestamp: new Date(),
      path: req.originalUrl,
    };
    if (isDev()) {
      apiResponse.internalLog = error.internalLog;
      apiResponse.stack = error.stack;
      apiResponse.cause = error.cause;
    }
    return apiResponse;
  }

  static toResponseWithDetails(
    error: {
      message: string;
      status: number;
      name: ErrNames;
      clientMessage?: string;
      internalLog?: string | object;
      cause?: unknown;
      stack?: string;
      details: Record<string, string>;
    },
    req: Request,
  ): ApiError {
    const apiResponse: ApiError = {
      success: false,
      message: error.message,
      timestamp: new Date(),
      path: req.originalUrl,
      details: error.details,
    };
    if (isDev()) {
      apiResponse.internalLog = error.internalLog;
      apiResponse.stack = error.stack;
      apiResponse.cause = error.cause;
    }
    return apiResponse;
  }
}
