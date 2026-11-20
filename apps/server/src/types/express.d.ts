// src/types/express.d.ts
import type { Page } from '@base-monorepo-v2/contracts/types/Page';
import 'express';
import type { ApiCursorResponse, ApiSimpleDataResponse } from './api/apiEnvelopRes';
import type { Cursor } from '@base-monorepo-v2/contracts/types/Cursor';

/**
 * Parameters for standardized API success responses.
 * If `status` is not provided, it defaults to HTTP `200` (OK).
 */
export type SucessResponseParams<T> = ApiSimpleDataResponse<T> | Page<T> | Cursor<T>;

declare global {
  namespace Express {
    interface Request {
      /** Populated by the `authenticate` middleware after JWT verification */
      // user?: {
      //   id: string;
      //   role: UserRole;
      // };
    }
    interface Response {
      /**
       * Sends a standardized JSON success response.
       * @default status 200 (OK) if not explicitly provided in `params.status`
       */
      success<T>(params: SucessResponseParams<T>): this;
    }
  }
}
