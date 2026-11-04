import { isProd } from '@base-monorepo-v2/env/server';

export const BCRYPT_ROUNDS = 12;

export const REFRESH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

export const ACCESS_EXPIRES_IN = '1h';
export const REFRESH_EXPIRES_IN = '30d';

export const REFRESH_COOKIE_NAME = 'refreshToken';

export const cookieOptions = {
  httpOnly: true,
  secure: isProd(),
  sameSite: 'strict' as const,
  path: '/api/auth/refresh', // scope the cookie to refresh endpoint only
};
