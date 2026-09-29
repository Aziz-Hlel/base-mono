export type ApiError = {
  success: false;
  message: string;
  details?: Record<string, string>;
  path: string;
  timestamp: Date;
  stack?: string;
  internalLog?: string | object;
  cause?: unknown;
};
