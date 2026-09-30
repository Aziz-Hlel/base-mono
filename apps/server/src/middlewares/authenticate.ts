import { UnauthorizedError } from '@/errors/customErrors';
import { jwtService } from '@/modules/auth/jwt.service';
import type { RequestHandler } from 'express';

/**
 * Authenticate middleware.
 * Reads the Bearer token from Authorization header, verifies it,
 * and attaches the decoded payload to req.user.
 *
 * Usage: router.get('/protected', authenticate, handler)
 */
export const authenticate: RequestHandler = (req, _res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new UnauthorizedError('Missing authorization header', {
        clientMessage: 'Authentication required.',
      }),
    );
  }

  const token = authHeader.slice(7); // strip "Bearer "

  try {
    const payload = jwtService.verifyAccessToken(token);
    req.user = {
      id: payload.id,
      role: payload.accountRole,
    };
    return next();
  } catch (err) {
    return next(
      new UnauthorizedError('Invalid or expired access token', {
        clientMessage: 'Session expired. Please refresh your token.',
        cause: err,
      }),
    );
  }
};
