// src/types/express.d.ts
import type { ApiCursorResponse, ApiPaginatedDataResponse, ApiSimpleDataResponse } from './api';
import type { AccountRole } from '@base-monorepo-v2/db/prisma';
import 'express';

export type SucessResponseParams<T> =
  ApiSimpleDataResponse<T> | ApiPaginatedDataResponse<T> | ApiCursorResponse<T>;

declare global {
  namespace Express {
    interface Request {
      /** Populated by the `authenticate` middleware after JWT verification */
      user?: {
        id: string;
        role: AccountRole;
        tokenId?: string; // present if decoded from refresh token context
      };
    }
    interface Response {
      success<T>(params: SucessResponseParams<T>): this;
    }
  }
}
