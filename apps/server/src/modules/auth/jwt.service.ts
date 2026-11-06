/**
 * ARCHITECTURE: JWT module = pure crypto. Sign and verify, nothing else.
 *
 * Rules this file follows on purpose:
 *  - No I/O: no Redis, no database, no HTTP. Given the same secret + input it always behaves
 *    the same, so it can be unit-tested with nothing but an env secret.
 *  - It does NOT know about sessions, rotation or revocation. That lives in session.service.ts.
 *    (Before this split, issuing a token pair also wrote to Redis, which meant anything that
 *    only needed `verifyAccessToken` — like the authenticate middleware — dragged a live Redis
 *    connection in through the import chain.)
 *  - It DOES own the decision "expired vs invalid" for access tokens, because only this module
 *    can tell them apart. Callers pass the resulting exception through instead of re-wrapping it.
 */
import ENV from '@/env';
import { UnauthorizedException } from '@/exceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import {
  accessTokenPayloadSchema,
  type AccessTokenPayload,
} from '@base-monorepo-v2/contracts/schemas/auth/accessTokenPaylod';
import jwt from 'jsonwebtoken';
import { authConfig } from './auth.config';

// Re-exported so callers depend on this module, not on where the schema happens to live.
export type { AccessTokenPayload };

export interface RefreshTokenPayload {
  id: string;
  tokenId: string; // unique ID per token, used by the session module for rotation / reuse detection
}

class JwtService {
  signAccessToken = (payload: AccessTokenPayload): string => {
    return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
      expiresIn: authConfig.accessTtlSeconds,
      algorithm: authConfig.signatureAlgorithm,
    });
  };

  signRefreshToken = (payload: RefreshTokenPayload): string => {
    return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
      expiresIn: authConfig.refreshTtlSeconds,
      algorithm: authConfig.signatureAlgorithm,
    });
  };

  verifyAccessToken = (token: string): AccessTokenPayload => {
    try {
      const payload = jwt.verify(token, ENV.JWT_ACCESS_SECRET, {
        algorithms: [authConfig.signatureAlgorithm],
      });

      const validatedPayload = accessTokenPayloadSchema.safeParse(payload);
      if (!validatedPayload.success) {
        throw new UnauthorizedException('Invalid access token', {
          code: ERROR_CODES.AUTH.INVALID_TOKEN,
          internalLog: 'Invalid access token payload, payload does not match expected schema',
          cause: validatedPayload.error,
        });
      }

      return validatedPayload.data;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Distinct code so the client knows to call /refresh instead of logging the user out.
        throw new UnauthorizedException('Access token has expired', {
          code: ERROR_CODES.AUTH.EXPIRED_TOKEN,
          internalLog: 'Access token has expired',
          cause: error,
        });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid access token', {
          code: ERROR_CODES.AUTH.INVALID_TOKEN,
          cause: error,
        });
      }
      throw error;
    }
  };

  verifyRefreshToken = (token: string): RefreshTokenPayload => {
    try {
      return jwt.verify(token, ENV.JWT_REFRESH_SECRET, {
        algorithms: [authConfig.signatureAlgorithm],
      }) as RefreshTokenPayload;
    } catch (error) {
      // No expired/invalid distinction here: for a refresh token both mean "log in again",
      // and the session module maps both to AUTH_INVALID_SESSION anyway.
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid refresh token', {
          code: ERROR_CODES.AUTH.INVALID_TOKEN,
          internalLog:
            error instanceof jwt.TokenExpiredError ? 'Refresh token has expired' : undefined,
          cause: error,
        });
      }
      throw error;
    }
  };
}

export const jwtService = new JwtService();
