export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
} as const;

export type SucessStatusCodes = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];

export const STATUS_CODES_ERROR = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_IMPLEMENTED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER: 500,
} as const;

export type ErrorStatusCodes = (typeof STATUS_CODES_ERROR)[keyof typeof STATUS_CODES_ERROR];
