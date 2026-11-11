import { UnauthorizedException } from '@/exceptions';
import { HttpException } from '@/exceptions/httpException';
import { jwtService } from '@/modules/auth/jwt.service';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { RequestHandler } from 'express';

export class AuthMiddleware {
  private stripBearerPrefix(token: string): string {
    return token.slice(7);
  }

  public authenticate: RequestHandler = (req, _res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(
        new UnauthorizedException('Authentication required', {
          code: ERROR_CODES.AUTH.INVALID_TOKEN,
          internalLog: {
            reason: 'Missing or malformed Authorization header',
            tokenValue: authHeader,
          },
        }),
      );
    }

    const token = this.stripBearerPrefix(authHeader);

    try {
      const payload = jwtService.verifyAccessToken(token);
      (req as any).user = {
        id: payload.id,
        role: payload.role,
      };
      return next();
    } catch (err) {
      // jwtService owns the decision (AUTH_EXPIRED_TOKEN vs AUTH_INVALID_TOKEN); pass it through untouched.
      if (err instanceof HttpException) return next(err);

      return next(
        new UnauthorizedException('Invalid access token', {
          code: ERROR_CODES.AUTH.INVALID_TOKEN,
          internalLog: { reason: 'Unexpected error while verifying access token' },
          cause: err,
        }),
      );
    }
  };
}

export const authMiddleware = new AuthMiddleware().authenticate;
