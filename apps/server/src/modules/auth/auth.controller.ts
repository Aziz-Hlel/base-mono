import { loginSchema } from '@base-monorepo-v2/contracts/schemas/auth/login.req';
import { registerSchema } from '@base-monorepo-v2/contracts/schemas/auth/register.req';
import type { Request, Response } from 'express';
import { authService } from './auth.service';
import { cookieOptions, REFRESH_COOKIE_NAME } from './const';

class AuthController {
  register = async (req: Request, res: Response) => {
    const input = registerSchema.parse(req.body);
    const tokens = await authService.register(input);

    res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, {
      ...cookieOptions,
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

    res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, {
      ...cookieOptions,
      maxAge: tokens.refreshCookieMaxAge,
    });

    return res.success({
      data: { accessToken: tokens.accessToken },
      message: 'Logged in successfully',
    });
  };

  refresh = async (req: Request, res: Response) => {
    const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME] as string | undefined;

    if (!rawRefreshToken) {
      return res.status(401).json({ success: false, message: 'No refresh token provided' });
    }

    const tokens = await authService.refresh(rawRefreshToken);

    res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, {
      ...cookieOptions,
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

    await authService.logout(user.id, user.tokenId ?? '', allDevices);

    res.clearCookie(REFRESH_COOKIE_NAME, { ...cookieOptions });

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
