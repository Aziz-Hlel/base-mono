import { UnauthorizedException } from '@/exceptions';
import { loginSchema } from '@base-monorepo-v2/contracts/schemas/auth/login.req';
import { registerSchema } from '@base-monorepo-v2/contracts/schemas/auth/register.req';
import type { Request, Response } from 'express';
import { authService } from './auth.service';
import { AUTH_CONST } from './const';

class AuthController {
  register = async (req: Request, res: Response) => {
    const input = registerSchema.parse(req.body);
    const tokens = await authService.register(input);

    res.cookie(AUTH_CONST.REFRESH_COOKIE_NAME, tokens.refreshToken, {
      ...AUTH_CONST.cookieOptions,
      maxAge: tokens.refreshCookieMaxAge,
    });

    return res.success({
      status: 201,
      data: { accessToken: tokens.accessToken },
      message: 'Account created successfully',
    });
  };

  login = async (req: Request, res: Response) => {
    const input = loginSchema.parse(req.body);
    const tokens = await authService.login(input);

    res.cookie(AUTH_CONST.REFRESH_COOKIE_NAME, tokens.refreshToken, {
      ...AUTH_CONST.cookieOptions,
      maxAge: tokens.refreshCookieMaxAge,
    });

    return res.success({
      data: { accessToken: tokens.accessToken },
      message: 'Logged in successfully',
    });
  };

  refresh = async (req: Request, res: Response) => {
    const rawRefreshToken = req.cookies?.[AUTH_CONST.REFRESH_COOKIE_NAME];

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

    res.cookie(AUTH_CONST.REFRESH_COOKIE_NAME, tokens.refreshToken, {
      ...AUTH_CONST.cookieOptions,
      maxAge: tokens.refreshCookieMaxAge,
    });

    return res.success({
      data: { accessToken: tokens.accessToken },
      message: 'Tokens refreshed successfully',
    });
  };

  logout = async (req: Request, res: Response) => {
    const user = req.user!; // set by authenticate middleware
    const allDevices = req.query.allDevices === 'true';

    const refreshToken = req.cookies?.[AUTH_CONST.REFRESH_COOKIE_NAME];

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

    res.clearCookie(AUTH_CONST.REFRESH_COOKIE_NAME, { ...AUTH_CONST.cookieOptions });

    return res.success({
      data: null,
      message: allDevices ? 'Logged out from all devices' : 'Logged out successfully',
    });
  };

  me = async (req: Request, res: Response) => {
    return res.success({
      data: { id: req.user!.id, role: req.user!.role },
      message: 'ok',
    });
  };
}

export const authController = new AuthController();
