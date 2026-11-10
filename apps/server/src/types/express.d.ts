// src/types/express.d.ts
import type { AccountRole } from '@base-monorepo-v2/db/prisma';
import 'express';
import type {
  ApiCursorResponse,
  ApiPaginatedDataResponse,
  ApiSimpleDataResponse,
} from './api/apiEnvelopRes';

/**
 * Parameters for standardized API success responses.
 * If `status` is not provided, it defaults to HTTP `200` (OK).
 */
export type SucessResponseParams<T> =
  ApiSimpleDataResponse<T> | ApiPaginatedDataResponse<T> | ApiCursorResponse<T>;

declare global {
  namespace Express {
    interface Request {
      /** Populated by the `authenticate` middleware after JWT verification */
      user?: {
        id: string;
        role: AccountRole;
      };
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
