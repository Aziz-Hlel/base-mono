export type Err = {
  status: number;
  message: string;
  name: string;
};

const ERRORS = {
  DATABASE_ERROR: {
    status: 500,
    message: 'Database Error',
    name: 'DatabaseError',
  },
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
    name: 'BadRequestError',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
    name: 'UnauthorizedError',
  },
  FORBIDDEN: {
    status: 403,
    message: 'Forbidden',
    name: 'ForbiddenError',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
    name: 'NotFoundError',
  },
  CONFLICT: {
    status: 409,
    message: 'Conflict',
    name: 'ConflictError',
  },
  PERMISSION_DENIED: {
    status: 403,
    message: 'Permission Denied',
    name: 'PermissionDeniedError',
  },
  INTERNAL_SERVER: {
    status: 500,
    message: 'Internal Server Error',
    name: 'InternalServerError',
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    message: 'Too Many Requests',
    name: 'TooManyRequestsError',
  },
  SERVICE_UNAVAILABLE: {
    status: 503,
    message: 'Service Unavailable',
    name: 'ServiceUnavailableError',
  },
  NOT_IMPLEMENTED: {
    status: 501,
    message: 'Not Implemented',
    name: 'NotImplementedError',
  },
} as const satisfies Record<string, Err>;

export type ErrKeys = keyof typeof ERRORS;
export type ErrNames = (typeof ERRORS)[ErrKeys]['name'];
export type ErrObject = (typeof ERRORS)[ErrKeys];
export default ERRORS;
