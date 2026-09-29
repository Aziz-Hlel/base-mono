// src/types/express.d.ts
import type { ApiCursorResponse, ApiPaginatedDataResponse, ApiSimpleDataResponse } from './api';
import 'express';

export type SucessResponseParams<T> = ApiSimpleDataResponse<T> | ApiPaginatedDataResponse<T> | ApiCursorResponse<T>;

declare global {
  namespace Express {
    interface Response {
      success<T>(params: SucessResponseParams<T>): this;
    }
  }
}
