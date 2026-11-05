import { isProd } from '@base-monorepo-v2/env/server';

const BCRYPT_ROUNDS = 12;

/**
 * ARCHITECTURE: single source of truth for token lifetimes.
 * The refresh lifetime is used in three places (JWT `exp`, Redis key TTL, cookie maxAge).
 * They MUST agree, otherwise you get e.g. a cookie that outlives its Redis entry, so derive
 * all three from these numbers instead of writing "30d" / "30 * 24 * ..." in each file.
 */
const ACCESS_TTL_SECONDS = 60 * 60; // 1 hour
const REFRESH_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

const REFRESH_COOKIE_MAX_AGE_MS = REFRESH_TTL_SECONDS * 1000; // express cookies use milliseconds

const REFRESH_COOKIE_NAME = 'refreshToken';

const SignatureAlgorithm = 'HS256';

const cookieOptions = {
  httpOnly: true,
  secure: isProd(),
  sameSite: 'strict' as const,
  path: '/api/auth', // scope the cookie to the auth routes only
};

export const AUTH_CONST = {
  REFRESH_COOKIE_NAME,
  REFRESH_COOKIE_MAX_AGE_MS,
  ACCESS_TTL_SECONDS,
  REFRESH_TTL_SECONDS,
  cookieOptions: cookieOptions,
  SignatureAlgorithm,
  BCRYPT_ROUNDS,
} as const;
