import redis from '@/redis/init';
import crypto from 'node:crypto';

const REFRESH_TOKEN_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

const buildKey = (accountId: string, tokenId: string | '*') => `auth:refresh:${accountId}:${tokenId}`;

const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

export class TokenStoreService {
  async store(accountId: string, refreshToken: string, tokenId: string): Promise<void> {
    const key = buildKey(accountId, tokenId);
    const hashedToken = hashToken(refreshToken);
    await redis.set(key, hashedToken, 'EX', REFRESH_TOKEN_TTL_SECONDS);
  }

  async validate(accountId: string, tokenId: string, refreshToken: string): Promise<boolean> {
    const key = buildKey(accountId, tokenId);
    const stored = await redis.get(key);
    if (!stored) return false;
    return stored === hashToken(refreshToken);
  }

  async revoke(accountId: string, tokenId: string): Promise<void> {
    const key = buildKey(accountId, tokenId);
    await redis.del(key);
  }

  async revokeAll(accountId: string): Promise<void> {
    const pattern = buildKey(accountId, '*');
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  }
}

export const tokenStoreService = new TokenStoreService();
