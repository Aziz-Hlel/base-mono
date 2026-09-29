const ErrorNames = {
  BAD_REQUEST: 'BadRequestError',
  UNAUTHORIZED: 'UnauthorizedError',
  FORBIDDEN: 'ForbiddenError',
  NOT_FOUND: 'NotFoundError',
  CONFLICT: 'ConflictError',
  PERMISSION_DENIED: 'PermissionDeniedError',
  INTERNAL_SERVER: 'InternalServerError',
  TOO_MANY_REQUESTS: 'TooManyRequestsError',
  SERVICE_UNAVAILABLE: 'ServiceUnavailableError',
} as const;
export default ErrorNames;

export type ErrorNameKeys = (typeof ErrorNames)[keyof typeof ErrorNames];
