import { UnauthorizedException } from '@/exceptions';
import type { AuthTokenRes } from '@excellense/contracts/schemas/auth/authToken.res';
import { refreshTokenBodySchema } from '@excellense/contracts/schemas/auth/refresh.req';
import type { Request, Response } from 'express';
import { authConfig } from './auth.config';

export const isMobileClient = (req: Request) =>
  req.get(authConfig.clientHeaderName)?.toLowerCase() === authConfig.mobileClientValue;

/**
 * Web: refresh token goes in an httpOnly cookie, body only carries the access token.
 * Mobile: no cookie, both tokens go in the body.
 */
export const sendTokens = (req: Request, res: Response, tokens: AuthTokenRes) => {
  if (isMobileClient(req)) {
    return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
  }

  res.cookie(authConfig.refreshCookieName, tokens.refreshToken, {
    ...authConfig.cookieOptions,
    maxAge: tokens.refreshCookieMaxAge,
  });

  return { accessToken: tokens.accessToken };
};

/** Reads the refresh token from the body (mobile) or the cookie (web). */
export const readRefreshToken = (req: Request): string => {
  const mobile = isMobileClient(req);

  if (mobile) {
    const parsed = refreshTokenBodySchema.safeParse(req.body);
    if (parsed.success) return parsed.data.refreshToken;
  } else {
    const fromCookie = req.cookies?.[authConfig.refreshCookieName];
    if (typeof fromCookie === 'string' && fromCookie.length > 0) return fromCookie;
  }

  // Never log the token value itself.
  throw new UnauthorizedException('No refresh token provided', {
    clientMessage: 'No refresh token provided',
    internalLog: {
      reason: mobile
        ? 'Refresh token missing or invalid in body'
        : 'Refresh token missing or invalid in cookies',
      client: mobile ? 'mobile' : 'web',
    },
  });
};
