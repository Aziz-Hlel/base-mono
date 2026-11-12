/**
 * ARCHITECTURE: Session module = the whole lifecycle of a refresh token, in one place.
 *
 *   issue  ──► (token lives in Redis) ──► rotate  ──► (old one consumed, new one issued)
 *                                    └──► revoke / revokeAll
 *
 * Why a separate module:
 *  - Locality: every rule about refresh tokens (single use, reuse detection, revocation)
 *    is in this file. To answer "what happens to a refresh token from birth to death?"
 *    you read this file top to bottom and nothing else.
 *  - Small interface: callers see four methods: issue / rotate / revoke / revokeAll.
 *    They never touch JWT signing or the token store directly. Those are implementation
 *    details behind this module, so they can change (e.g. a grace window for concurrent tabs,
 *    or moving the store from Redis to Postgres) without touching auth.service or controllers.
 *  - auth.service is left with ONE job: checking credentials (register / login).
 *
 * Dependency direction (arrows only point one way):
 *   auth.service ──► session.service ──► jwt.service   (pure crypto)
 *                                   └──► token-store   (Redis; only this module imports it)
 */
import prisma from '@/db';
import { UnauthorizedException } from '@/exceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { AuthTokenRes } from '@base-monorepo-v2/contracts/schemas/auth/authToken.res';
import type { UserRole } from '@base-monorepo-v2/db/prisma';
import crypto from 'node:crypto';
import { authConfig } from './auth.config';
import { jwtService, type RefreshTokenPayload } from './jwt.service';
import { tokenStoreService } from './token-store.service';

class SessionService {
  /** Start a new session for an account (after register / login). */
  async issue(accountId: string, role: UserRole): Promise<AuthTokenRes> {
    // tokenId is a per-token handle: it is the Redis key suffix, which lets us revoke ONE
    // device's session without knowing the raw token, and detect reuse of an old one.
    const tokenId = crypto.randomUUID();
    const refreshToken = jwtService.signRefreshToken({ id: accountId, tokenId });

    // Store BEFORE handing tokens out: a refresh token the store doesn't know about
    // would be rejected as "reused" on first use.
    await tokenStoreService.store(accountId, refreshToken, tokenId);

    return {
      accessToken: jwtService.signAccessToken({ id: accountId, role }),
      refreshToken,
      refreshCookieMaxAge: authConfig.refreshCookieMaxAgeMs,
    };
  }

  /**
   * Exchange a refresh token for a new pair (rotation). Each refresh token works exactly once.
   * Every failure surfaces as AUTH_INVALID_SESSION. The client only needs to know
   * "log in again", and telling it *why* (expired? reused?) would only help an attacker.
   */
  async rotate(rawRefreshToken: string): Promise<AuthTokenRes> {
    const payload = this.verifyOrInvalidSession(rawRefreshToken);

    // Atomic check-and-delete (Redis GETDEL): of two concurrent requests with the same token,
    // exactly one wins. A non-atomic get-then-delete would let both succeed.
    const isValid = await tokenStoreService.consume(payload.id, payload.tokenId, rawRefreshToken);

    if (!isValid) {
      // A correctly-signed token that the store no longer knows = it was already used.
      // Either an attacker replayed a stolen token or the legit client did. We can't tell
      // which, so kill every session for the account (OWASP-recommended reuse detection).
      await tokenStoreService.revokeAll(payload.id);
      throw this.invalidSession('Refresh token reuse detected');
    }

    // Re-read the account instead of trusting the token: it may have been deleted, or its
    // role changed, since the token was issued. The new access token must reflect today's role.
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, role: true },
    });

    if (!user) throw this.invalidSession('Account not found');

    return this.issue(user.id, user.role);
  }

  /** End ONE session (this device). Idempotent: an invalid/expired token is simply a no-op. */
  async revoke(rawRefreshToken: string, accountId: string): Promise<void> {
    let payload: RefreshTokenPayload;
    try {
      payload = jwtService.verifyRefreshToken(rawRefreshToken);
    } catch {
      return; // Expired or invalid: nothing left to revoke.
    }
    // Guard: a logged-in user must not be able to revoke someone else's session
    // by sending another account's refresh cookie.
    if (payload.id !== accountId) return;

    await tokenStoreService.revoke(payload.id, payload.tokenId);
  }

  /** End EVERY session for an account (logout from all devices, password change, etc.). */
  async revokeAll(accountId: string): Promise<void> {
    await tokenStoreService.revokeAll(accountId);
  }

  private verifyOrInvalidSession(rawRefreshToken: string): RefreshTokenPayload {
    try {
      return jwtService.verifyRefreshToken(rawRefreshToken);
    } catch (error) {
      throw this.invalidSession('Invalid or expired refresh token', error);
    }
  }

  private invalidSession(reason: string, cause?: unknown): UnauthorizedException {
    return new UnauthorizedException('Invalid session', {
      code: ERROR_CODES.AUTH.INVALID_SESSION,
      internalLog: reason,
      cause,
    });
  }
}

export const sessionService = new SessionService();
