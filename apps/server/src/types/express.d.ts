// src/types/express.d.ts
import type { ApiCursorResponse, ApiPaginatedDataResponse, ApiSimpleDataResponse } from './api';
import 'express';

export type SucessResponseParams<T> = ApiSimpleDataResponse<T> | ApiPaginatedDataResponse<T> | ApiCursorResponse<T>;

export interface ErrorResponseParams<T> {
  message: string;
  status: number;
  data: T;
}

declare global {
  namespace Express {
    interface Response {
      success<T>(params: SucessResponseParams<T>): this;
      error<T>(params: ErrorResponseParams<T>): this;
    }
  }
}
