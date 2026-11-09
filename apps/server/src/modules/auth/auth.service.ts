/**
 * ARCHITECTURE: Auth module = "who are you?" (credentials). Nothing about tokens.
 *
 * It verifies credentials, then hands off to the session module to start / end sessions.
 * It never signs JWTs or touches the token store. If you find yourself importing
 * jwt.service or token-store.service here, that logic probably belongs in session.service.
 */
import prisma from '@/db';
import PrismaExceptionCodes from '@/db/PrismaExceptionCodes';
import { ConflictException, UnauthorizedException } from '@/exceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { LoginInput } from '@base-monorepo-v2/contracts/schemas/auth/login.req';
import type { RegisterInput } from '@base-monorepo-v2/contracts/schemas/auth/register.req';
import { Prisma } from '@base-monorepo-v2/db/prisma';
import { passwordService } from './password.service';
import { sessionService, type AuthTokens } from './session.service';

export type { AuthTokens };

class AuthService {
  async register(input: RegisterInput): Promise<AuthTokens> {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Email already registered', {
        code: ERROR_CODES.USER.ALREADY_EXISTS,
      });
    }

    const hashedPassword = await passwordService.hashPassword(input.password);

    let user;
    try {
      user = await prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
        select: { id: true, role: true },
      });
    } catch (error) {
      // The findUnique above is a fast path; this catch is the real guarantee. Two concurrent
      // registrations can both pass the check, and the DB unique constraint is what stops the second.
      // We translate the DB error into a domain exception HERE, where we know what it means.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaExceptionCodes.UNIQUE_CONSTRAINT
      ) {
        throw new ConflictException('Email already registered', {
          code: ERROR_CODES.USER.ALREADY_EXISTS,
        });
      }
      throw error;
    }

    // Kept outside the try on purpose: a Redis failure while issuing the session must not be
    // mistaken for (or swallowed by) the DB error handling above.
    return sessionService.issue(user.id, user.role);
  }

  async login(input: LoginInput): Promise<AuthTokens> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true, role: true, password: true },
    });

    const INVALID_CREDENTIALS = 'Invalid email or password';

    if (!user || !user.password) {
      // Timing-safe: always hash to prevent timing attacks revealing account existence
      await passwordService.hashPassword(input.password);
      throw new UnauthorizedException(INVALID_CREDENTIALS, {
        code: ERROR_CODES.AUTH.INVALID_CREDENTIALS,
        internalLog: 'Account not found or does not have a password ',
      });
    }

    const isValid = await passwordService.comparePassword(input.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException(INVALID_CREDENTIALS, {
        code: ERROR_CODES.AUTH.INVALID_CREDENTIALS,
        internalLog: 'Password mismatch',
      });
    }

    return sessionService.issue(user.id, user.role);
  }

  // Thin delegations: the controller only talks to authService, and the rules live in sessionService.
  // If these ever feel pointless, the controller may call sessionService directly. Both are fine.
  async refresh(rawRefreshToken: string): Promise<AuthTokens> {
    return sessionService.rotate(rawRefreshToken);
  }

  async logout(accountId: string, rawRefreshToken: string, allDevices = false): Promise<void> {
    if (allDevices) return sessionService.revokeAll(accountId);
    return sessionService.revoke(rawRefreshToken, accountId);
  }
}

export const authService = new AuthService();
