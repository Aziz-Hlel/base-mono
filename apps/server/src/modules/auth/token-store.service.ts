/**
 * ARCHITECTURE: Token store = storage adapter for refresh tokens (Redis).
 *
 * INTERNAL to the session module: only session.service.ts should import this file.
 * It knows HOW tokens are stored (key layout, hashing, TTL), not WHEN to store or revoke them;
 * those rules live in session.service. Keeping it dumb means swapping Redis for something else
 * (or an in-memory fake in tests) only touches this file.
 */
import redis from '@/redis/init';
import crypto from 'node:crypto';
import { AUTH_CONST } from './const';

export class TokenStoreService {
  // Same number as the JWT `exp` and the cookie maxAge (see const/index.ts).
  private static REFRESH_TOKEN_TTL_SECONDS = AUTH_CONST.REFRESH_TTL_SECONDS;

  // We store sha256(token), never the raw token: a Redis dump/leak must not hand out live sessions.

  private buildKey = (accountId: string, tokenId: string | '*') =>
    `auth:refresh:${accountId}:${tokenId}`;

  private hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

  async store(accountId: string, refreshToken: string, tokenId: string): Promise<void> {
    const key = this.buildKey(accountId, tokenId);
    const hashedToken = this.hashToken(refreshToken);
    await redis.set(key, hashedToken, 'EX', TokenStoreService.REFRESH_TOKEN_TTL_SECONDS);
  }

  /**
   * Atomically checks and deletes a refresh token (single use).
   * GETDEL guarantees only one caller can ever receive the stored hash, so two concurrent
   * refreshes with the same token cannot both succeed. Requires Redis >= 6.2.
   * @returns true if the token existed and matched; false if missing, already used, or mismatched.
   */
  async consume(accountId: string, tokenId: string, refreshToken: string): Promise<boolean> {
    const key = this.buildKey(accountId, tokenId);
    const stored = await redis.getdel(key);
    if (!stored) return false;
    return stored === this.hashToken(refreshToken);
  }

  async revoke(accountId: string, tokenId: string): Promise<void> {
    const key = this.buildKey(accountId, tokenId);
    await redis.del(key);
  }

  async revokeAll(accountId: string): Promise<void> {
    const pattern = this.buildKey(accountId, '*');
    let cursor = '0';

    do {
      // SCAN returns [nextCursor, matchingKeys]
      const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);

      cursor = nextCursor;

      if (keys.length > 0) {
        // Use UNLINK instead of DEL for non-blocking asynchronous memory reclamation
        await redis.unlink(...keys);
      }
    } while (cursor !== '0');
  }
}

export const tokenStoreService = new TokenStoreService();
