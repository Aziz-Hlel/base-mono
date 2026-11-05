import { ERROR_CODES, type GlobalErrorCode } from '@base-monorepo-v2/contracts/exceptions/codes';

const apiErrorDefinitions = {
  DATABASE_ERROR: {
    status: 500,
    code: ERROR_CODES.GLOBAL.INTERNAL_SERVER_ERROR,
  },
  BAD_REQUEST: {
    status: 400,
    code: ERROR_CODES.GLOBAL.BAD_REQUEST,
  },
  UNAUTHORIZED: {
    status: 401,
    code: ERROR_CODES.GLOBAL.UNAUTHORIZED,
  },
  FORBIDDEN: {
    status: 403,
    code: ERROR_CODES.GLOBAL.FORBIDDEN,
  },
  NOT_FOUND: {
    status: 404,
    code: ERROR_CODES.GLOBAL.NOT_FOUND,
  },
  CONFLICT: {
    status: 409,
    code: ERROR_CODES.GLOBAL.CONFLICT,
  },
  PERMISSION_DENIED: {
    status: 403,
    code: ERROR_CODES.GLOBAL.PERMISSION_DENIED,
  },
  INTERNAL_SERVER: {
    status: 500,
    code: ERROR_CODES.GLOBAL.INTERNAL_SERVER_ERROR,
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    code: ERROR_CODES.GLOBAL.TOO_MANY_REQUESTS,
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    code: ERROR_CODES.GLOBAL.SERVICE_UNAVAILABLE,
  },
  NOT_IMPLEMENTED: {
    status: 501,
    code: ERROR_CODES.GLOBAL.NOT_IMPLEMENTED,
  },
} as const satisfies Record<string, { status: number; code: GlobalErrorCode }>;

export default apiErrorDefinitions;
