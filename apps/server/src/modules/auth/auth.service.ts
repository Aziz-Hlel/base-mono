import type { LoginInput, RegisterInput } from './auth.schemas';
import { jwtService } from './jwt.service';
import { tokenStoreService } from './token-store.service';
import { ConflictError, UnauthorizedError } from '@/errors/customErrors';
import prisma from '@base-monorepo-v2/db';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

const BCRYPT_ROUNDS = 12;

const REFRESH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  refreshCookieMaxAge: number;
}

class AuthService {
  /**
   * Register a new account + user record.
   * Throws ConflictError if email already exists.
   */
  async register(input: RegisterInput): Promise<AuthTokens> {
    const existing = await prisma.account.findUnique({
      where: { email: input.email },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictError('Email already registered', {
        clientMessage: 'An account with this email already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

    const account = await prisma.account.create({
      data: {
        email: input.email,
        password: hashedPassword,
        username: input.username ?? null,
        user: { create: {} }, // auto-create related User row
      },
      select: { id: true, user: { select: { id: true } } },
    });

    const userId = account.user!.id;
    return authService._issueTokenPair(account.id, userId);
  }

  /**
   * Login with email + password.
   * Throws UnauthorizedError on bad credentials (intentionally vague).
   */
  async login(input: LoginInput): Promise<AuthTokens> {
    const account = await prisma.account.findUnique({
      where: { email: input.email },
      select: { id: true, password: true, user: { select: { id: true } } },
    });

    const INVALID_CREDENTIALS = 'Invalid email or password';

    if (!account || !account.password) {
      // Timing-safe: always hash to prevent timing attacks revealing account existence
      await bcrypt.hash(input.password, BCRYPT_ROUNDS);
      throw new UnauthorizedError(INVALID_CREDENTIALS, {
        clientMessage: INVALID_CREDENTIALS,
      });
    }

    const isValid = await bcrypt.compare(input.password, account.password);
    if (!isValid) {
      throw new UnauthorizedError(INVALID_CREDENTIALS, {
        clientMessage: INVALID_CREDENTIALS,
      });
    }

    const userId = account.user!.id;
    return authService._issueTokenPair(account.id, userId);
  }

  /**
   * Rotate refresh token: validate old one, revoke it, issue a new pair.
   * Throws UnauthorizedError on any invalid state (reuse attack, expired, etc.).
   */
  async refresh(rawRefreshToken: string): Promise<AuthTokens> {
    let payload;
    try {
      payload = jwtService.verifyRefreshToken(rawRefreshToken);
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token', {
        clientMessage: 'Session expired. Please log in again.',
      });
    }

    const isValid = await tokenStoreService.validate(payload.accountId, payload.tokenId, rawRefreshToken);

    if (!isValid) {
      // Possible reuse attack — revoke ALL tokens for this account as a safety measure
      await tokenStoreService.revokeAll(payload.accountId);
      throw new UnauthorizedError('Refresh token reuse detected', {
        clientMessage: 'Session invalid. Please log in again.',
      });
    }

    // Revoke the used token (rotation: one use only)
    await tokenStoreService.revoke(payload.accountId, payload.tokenId);

    // Fetch userId from DB (not stored in the refresh payload intentionally)
    const account = await prisma.account.findUnique({
      where: { id: payload.accountId },
      select: { user: { select: { id: true } } },
    });

    if (!account?.user) {
      throw new UnauthorizedError('Account not found', {
        clientMessage: 'Session invalid. Please log in again.',
      });
    }

    return authService._issueTokenPair(payload.accountId, account.user.id);
  }

  /**
   * Logout: revoke either one session (current device) or all sessions.
   */
  async logout(accountId: string, tokenId: string, allDevices = false): Promise<void> {
    if (allDevices) {
      await tokenStoreService.revokeAll(accountId);
    } else {
      await tokenStoreService.revoke(accountId, tokenId);
    }
  }

  /**
   * Issue a fresh access + refresh token pair.
   * Flow: generate tokenId → sign refresh with that ID → store hash in Redis → sign access.
   */
  async _issueTokenPair(accountId: string, userId: string): Promise<AuthTokens> {
    // 1. Generate a unique token ID upfront
    const tokenId = crypto.randomUUID();

    // 2. Sign the refresh token with the tokenId embedded
    const refreshToken = jwtService.signRefreshToken({ accountId, tokenId });

    // 3. Store the hashed refresh token in Redis (keyed by accountId + tokenId)
    await tokenStoreService.store(accountId, refreshToken, tokenId);

    // 4. Sign the access token
    const accessToken = jwtService.signAccessToken({ userId, accountId });

    return {
      accessToken,
      refreshToken,
      refreshCookieMaxAge: REFRESH_COOKIE_MAX_AGE,
    };
  }
}

export const authService = new AuthService();
