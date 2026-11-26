import type { ErrorCode } from '@excellense/contracts/exceptions/codes';

export type ApiError = {
  success: false;
  message: string;
  code?: ErrorCode;
  clientMessage?: string;
  details?: Record<string, string | string[]>;
  path: string;
  timestamp: Date;
  stack?: string[];
  internalLog?: string | object;
  cause?: unknown;
};
