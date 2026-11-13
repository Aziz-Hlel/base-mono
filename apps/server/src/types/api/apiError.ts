import type { ErrorCode } from '@base-monorepo-v2/contracts/exceptions/codes';

export type ApiError = {
  success: false;
  message: string;
  code?: ErrorCode;
  clientMessage?: string;
  details?: Record<string, string | string[]>;
  debug?: Record<string, any>;
  path: string;
  timestamp: Date;
  stack?: string[];
  internalLog?: string | object;
  cause?: unknown;
};
