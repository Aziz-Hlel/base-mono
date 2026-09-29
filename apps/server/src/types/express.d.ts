// src/types/express.d.ts
import type { ApiCursorResponse, ApiPaginatedDataResponse, ApiSimpleDataResponse } from './api';
import 'express';

export type SucessResponseParams<T> = ApiSimpleDataResponse<T> | ApiPaginatedDataResponse<T> | ApiCursorResponse<T>;

declare global {
  namespace Express {
    interface Request {
      /** Populated by the `authenticate` middleware after JWT verification */
      user?: {
        userId: string;
        accountId: string;
        tokenId?: string; // present if decoded from refresh token context
      };
    }
    interface Response {
      success<T>(params: SucessResponseParams<T>): this;
    }
  }
}
