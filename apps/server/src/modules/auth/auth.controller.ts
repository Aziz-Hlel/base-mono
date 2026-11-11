import { UnauthorizedException } from '@/exceptions';
import type { AuthRequest } from '@/types/api/authRequest';
import { loginSchema } from '@base-monorepo-v2/contracts/schemas/auth/login.req';
import { oauthReqSchema } from '@base-monorepo-v2/contracts/schemas/auth/oauth.req';
import { registerSchema } from '@base-monorepo-v2/contracts/schemas/auth/register.req';
import type { Request, Response } from 'express';
import { authConfig } from './auth.config';
import { authService } from './auth.service';

class AuthController {
  register = async (req: Request, res: Response) => {
    const input = registerSchema.parse(req.body);
    const tokens = await authService.register(input);

    res.cookie(authConfig.refreshCookieName, tokens.refreshToken, {
      ...authConfig.cookieOptions,
      maxAge: tokens.refreshCookieMaxAge,
    });

    res.success({
      status: 201,
      data: { accessToken: tokens.accessToken },
      message: 'Account created successfully',
    });
  };

  login = async (req: Request, res: Response) => {
    const input = loginSchema.parse(req.body);
    const tokens = await authService.login(input);

    res.cookie(authConfig.refreshCookieName, tokens.refreshToken, {
      ...authConfig.cookieOptions,
      maxAge: tokens.refreshCookieMaxAge,
    });

    res.success({
      data: { accessToken: tokens.accessToken },
      message: 'Logged in successfully',
    });
  };

  oauth = async (req: Request, res: Response) => {
    const input = oauthReqSchema.parse(req.body);
    const tokens = await authService.oauth(input);

    res.cookie(authConfig.refreshCookieName, tokens.refreshToken, {
      ...authConfig.cookieOptions,
      maxAge: tokens.refreshCookieMaxAge,
    });

    res.success({
      data: { accessToken: tokens.accessToken },
      message: 'Logged in successfully',
    });
  };

  refresh = async (req: Request, res: Response) => {
    const rawRefreshToken = req.cookies?.[authConfig.refreshCookieName];

    if (!rawRefreshToken) {
      throw new UnauthorizedException('No refresh token provided', {
        clientMessage: 'No refresh token provided',
        internalLog: {
          reason: 'Refresh token missing in cookies',
          refreshTokenValue: rawRefreshToken,
        },
      });
    }

    if (typeof rawRefreshToken !== 'string') {
      throw new UnauthorizedException('Invalid refresh token format', {
        clientMessage: 'Invalid refresh token format',
        internalLog: {
          reason: 'Refresh token is not a string',
          refreshTokenValue: rawRefreshToken,
        },
      });
    }

    const tokens = await authService.refresh(rawRefreshToken);

    res.cookie(authConfig.refreshCookieName, tokens.refreshToken, {
      ...authConfig.cookieOptions,
      maxAge: tokens.refreshCookieMaxAge,
    });

    res.success({
      data: { accessToken: tokens.accessToken },
      message: 'Tokens refreshed successfully',
    });
  };

  logout = async (req: AuthRequest, res: Response) => {
    const user = req.user!; // set by authenticate middleware
    const allDevices = req.query.allDevices === 'true';

    const refreshToken = req.cookies?.[authConfig.refreshCookieName];

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided', {
        clientMessage: 'No refresh token provided',
        internalLog: {
          reason: 'Refresh token missing in cookies',
          refreshTokenValue: refreshToken,
        },
      });
    }

    if (typeof refreshToken !== 'string') {
      throw new UnauthorizedException('Invalid refresh token format', {
        clientMessage: 'Invalid refresh token format',
        internalLog: {
          reason: 'Refresh token is not a string',
          refreshTokenValue: refreshToken,
        },
      });
    }

    await authService.logout(user.id, refreshToken, allDevices);

    res.clearCookie(authConfig.refreshCookieName, { ...authConfig.cookieOptions });

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
