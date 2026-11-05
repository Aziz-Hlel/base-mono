import { HttpException, type HttpExceptionOptions } from './httpException';

export class BadRequestException extends HttpException {
  constructor(message: string, payload?: HttpExceptionOptions) {
    super('BAD_REQUEST', message, payload);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, payload?: HttpExceptionOptions) {
    super('UNAUTHORIZED', message, payload);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string, payload?: HttpExceptionOptions) {
    super('FORBIDDEN', message, payload);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, payload?: HttpExceptionOptions) {
    super('NOT_FOUND', message, payload);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, payload?: HttpExceptionOptions) {
    super('CONFLICT', message, payload);
  }
}

export class PermissionDeniedException extends HttpException {
  constructor(message: string, payload?: HttpExceptionOptions) {
    super('PERMISSION_DENIED', message, payload);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string, payload?: HttpExceptionOptions) {
    super('INTERNAL_SERVER', message, payload);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string, payload?: HttpExceptionOptions) {
    super('NOT_IMPLEMENTED', message, payload);
  }
}
