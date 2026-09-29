import { loginSchema, registerSchema } from './auth.schemas';
import { authService } from './auth.service';
import type { Request, Response } from 'express';

const REFRESH_COOKIE_NAME = 'refreshToken';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/api/auth/refresh', // scope the cookie to refresh endpoint only
};

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
      status: 200,
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
      status: 200,
      data: { accessToken: tokens.accessToken },
      message: 'Tokens refreshed successfully',
    });
  };

  logout = async (req: Request, res: Response) => {
    const user = req.user!; // set by authenticate middleware
    const allDevices = req.query.allDevices === 'true';

    await authService.logout(user.accountId, user.tokenId ?? '', allDevices);

    res.clearCookie(REFRESH_COOKIE_NAME, { ...cookieOptions });

    return res.success({
      status: 200,
      data: null,
      message: allDevices ? 'Logged out from all devices' : 'Logged out successfully',
    });
  };

  me = async (req: Request, res: Response) => {
    return res.success({
      status: 200,
      data: { userId: req.user!.userId, accountId: req.user!.accountId },
      message: 'ok',
    });
  };
}

export const authController = new AuthController();
