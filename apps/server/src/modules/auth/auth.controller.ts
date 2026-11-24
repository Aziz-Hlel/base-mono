import { UnauthorizedException } from '@/exceptions';
import type { AuthRequest } from '@/types/api/authRequest';
import type { AuthTokenRes } from '@base-monorepo-v2/contracts/schemas/auth/authToken.res';
import { loginSchema } from '@base-monorepo-v2/contracts/schemas/auth/login.req';
import { oauthReqSchema } from '@base-monorepo-v2/contracts/schemas/auth/oauth.req';
import { refreshTokenBodySchema } from '@base-monorepo-v2/contracts/schemas/auth/refresh.req';
import { registerSchema } from '@base-monorepo-v2/contracts/schemas/auth/register.req';
import type { Request, Response } from 'express';
import { authConfig } from './auth.config';
import { authService } from './auth.service';
import { sessionService } from './session.service';

const isMobileClient = (req: Request) =>
  req.get(authConfig.clientHeaderName)?.toLowerCase() === authConfig.mobileClientValue;

/**
 * Web: refresh token goes in an httpOnly cookie, body only carries the access token.
 * Mobile: no cookie, both tokens go in the body.
 */
const sendTokens = (req: Request, res: Response, tokens: AuthTokenRes) => {
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
const readRefreshToken = (req: Request): string => {
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

class AuthController {
  register = async (req: Request, res: Response) => {
    const input = registerSchema.parse(req.body);
    const user = await authService.register(input);
    const tokens = await sessionService.issue(user.id, user.role);

    res.success({
      status: 201,
      data: sendTokens(req, res, tokens),
      message: 'Account created successfully',
    });
  };

  login = async (req: Request, res: Response) => {
    const input = loginSchema.parse(req.body);
    const tokens = await authService.login(input);

    res.success({
      data: sendTokens(req, res, tokens),
      message: 'Logged in successfully',
    });
  };

  oauth = async (req: Request, res: Response) => {
    const input = oauthReqSchema.parse(req.body);
    const tokens = await authService.oauth(input);

    res.success({
      data: sendTokens(req, res, tokens),
      message: 'Logged in successfully',
    });
  };

  refresh = async (req: Request, res: Response) => {
    const rawRefreshToken = readRefreshToken(req);
    const tokens = await authService.refresh(rawRefreshToken);

    res.success({
      data: sendTokens(req, res, tokens),
      message: 'Tokens refreshed successfully',
    });
  };

  logout = async (req: AuthRequest, res: Response) => {
    const user = req.user!; // set by authenticate middleware
    const allDevices = req.query.allDevices === 'true';

    const refreshToken = readRefreshToken(req);

    await authService.logout(user.id, refreshToken, allDevices);

    if (!isMobileClient(req)) {
      res.clearCookie(authConfig.refreshCookieName, { ...authConfig.cookieOptions });
    }

    res.success({
      data: null,
      message: allDevices ? 'Logged out from all devices' : 'Logged out successfully',
    });
  };

  me = async (req: AuthRequest, res: Response) => {
    res.success({
      data: { id: req.user!.id, role: req.user!.role },
      message: 'ok',
    });
  };
}

export const authController = new AuthController();
