import { isProd } from '@excellense/env/server';

const bcryptRounds = 12;

/**
 * ARCHITECTURE: single source of truth for token lifetimes.
 * The refresh lifetime is used in three places (JWT `exp`, Redis key TTL, cookie maxAge).
 * They MUST agree, otherwise you get e.g. a cookie that outlives its Redis entry, so derive
 * all three from these numbers instead of writing "30d" / "30 * 24 * ..." in each file.
 */
const accessTtlSeconds = 60 * 60; // 1 hour
const refreshTtlSeconds = 30 * 24 * 60 * 60; // 30 days

const refreshCookieMaxAgeMs = refreshTtlSeconds * 1000; // express cookies use milliseconds

const refreshCookieName = 'refreshToken';

const signatureAlgorithm = 'HS256';

/**
 * Native mobile apps send `X-Client: mobile`. They get the refresh token in the response
 * body (to keep in Keychain/Keystore) and send it back in the body, instead of using cookies.
 */
const clientHeaderName = 'x-client';
const mobileClientValue = 'mobile';

const cookieOptions = {
  httpOnly: true,
  secure: isProd(),
  sameSite: 'strict' as const,
  path: '/api/auth', // scope the cookie to the auth routes only
};

export const authConfig = {
  refreshCookieName,
  refreshCookieMaxAgeMs,
  accessTtlSeconds,
  refreshTtlSeconds,
  cookieOptions,
  signatureAlgorithm,
  bcryptRounds,
  clientHeaderName,
  mobileClientValue,
} as const;
