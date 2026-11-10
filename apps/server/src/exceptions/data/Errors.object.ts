import { ERROR_CODES, type GlobalErrorCode } from '@base-monorepo-v2/contracts/exceptions/codes';

const apiErrorDefinitions = {
  DATABASE_ERROR: {
    status: 500,
    defaultMessage: 'Internal Server Error',
    code: ERROR_CODES.GLOBAL.INTERNAL_SERVER_ERROR,
  },
  BAD_REQUEST: {
    status: 400,
    defaultMessage: 'Bad request',
    code: ERROR_CODES.GLOBAL.BAD_REQUEST,
  },
  UNAUTHORIZED: {
    status: 401,
    defaultMessage: 'Unauthorized',
    code: ERROR_CODES.GLOBAL.UNAUTHORIZED,
  },
  FORBIDDEN: {
    status: 403,
    defaultMessage: 'Forbidden',
    code: ERROR_CODES.GLOBAL.FORBIDDEN,
  },
  NOT_FOUND: {
    status: 404,
    defaultMessage: 'Not found',
    code: ERROR_CODES.GLOBAL.NOT_FOUND,
  },
  CONFLICT: {
    status: 409,
    defaultMessage: 'Conflict',
    code: ERROR_CODES.GLOBAL.CONFLICT,
  },
  PERMISSION_DENIED: {
    status: 403,
    defaultMessage: 'Prermission denied',
    code: ERROR_CODES.GLOBAL.PERMISSION_DENIED,
  },
  INTERNAL_SERVER: {
    status: 500,
    defaultMessage: 'Internal Server Error',
    code: ERROR_CODES.GLOBAL.INTERNAL_SERVER_ERROR,
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    defaultMessage: 'Too many requests',
    code: ERROR_CODES.GLOBAL.TOO_MANY_REQUESTS,
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    defaultMessage: 'Service unavailable',
    code: ERROR_CODES.GLOBAL.SERVICE_UNAVAILABLE,
  },
  NOT_IMPLEMENTED: {
    status: 501,
    defaultMessage: 'Not implemented',
    code: ERROR_CODES.GLOBAL.NOT_IMPLEMENTED,
  },
} as const satisfies Record<
  string,
  { status: number; defaultMessage: string; code: GlobalErrorCode }
>;

export default apiErrorDefinitions;
