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
import logger from '@/logger';
import { oauthProvider } from '@/oauth';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { AuthTokenRes } from '@base-monorepo-v2/contracts/schemas/auth/authToken.res';
import type { LoginInput } from '@base-monorepo-v2/contracts/schemas/auth/login.req';
import type { OauthReq } from '@base-monorepo-v2/contracts/schemas/auth/oauth.req';
import type { RegisterInput } from '@base-monorepo-v2/contracts/schemas/auth/register.req';
import { Prisma, type AccountRole } from '@base-monorepo-v2/db/prisma';
import { passwordService } from './password.service';
import { sessionService } from './session.service';

class AuthService {
  async register(input: RegisterInput): Promise<AuthTokenRes> {
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

  async login(input: LoginInput): Promise<AuthTokenRes> {
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
  async refresh(rawRefreshToken: string): Promise<AuthTokenRes> {
    return sessionService.rotate(rawRefreshToken);
  }

  async logout(accountId: string, rawRefreshToken: string, allDevices = false): Promise<void> {
    if (allDevices) return sessionService.revokeAll(accountId);
    return sessionService.revoke(rawRefreshToken, accountId);
  }

  async oauth(input: OauthReq): Promise<AuthTokenRes> {
    const decoded = await oauthProvider.verifyToken(input.token);

    if (!decoded.email) {
      throw new UnauthorizedException('Invalid token', {
        code: ERROR_CODES.AUTH.INVALID_TOKEN,
        internalLog: 'Firebase token has no email in decoded token',
        details: {
          tokenEmail: decoded.email,
        },
      });
    }

    const user = await this.resolveOauthUser(
      decoded.uid,
      decoded.email,
      decoded.email_verified === true,
    );

    return sessionService.issue(user.id, user.role);
  }

  // TODO(security): linking trusts any token from the Firebase project and any email match.
  //  1. email_verified and the sign-in provider are not checked. This is only safe while Google
  //     and Apple are the only providers enabled in Firebase. If Email/Password is ever turned on,
  //     anyone could claim an existing account with an unverified email.
  //  2. The password is kept on link and register doesn't verify email ownership, so someone who
  //     registered this email first can still log in with their password after the real owner
  //     links Google or Apple. Add email verification to register, or clear unverified passwords here.
  private async resolveOauthUser(
    authId: string,
    email: string,
    emailVerified: boolean,
  ): Promise<{ id: string; role: AccountRole }> {
    const exisitingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true, email: true, isEmailVerified: true, authId: true },
    });

    if (exisitingUser) {
      const userUpdatedData: Prisma.UserUpdateInput = {};
      if (exisitingUser.isEmailVerified !== emailVerified) {
        userUpdatedData.isEmailVerified = emailVerified;
      }
      if (exisitingUser.authId && exisitingUser.authId !== authId) {
        userUpdatedData.authId = authId;
        logger.warn(
          {
            userId: exisitingUser.id,
            email,
            previousAuthId: exisitingUser.authId,
            newAuthId: authId,
          },
          'OAuth authId overwritten',
        );
      }
      if (Object.keys(userUpdatedData).length !== 0) {
        await prisma.user.update({
          where: { id: exisitingUser.id },
          data: { isEmailVerified: true },
          select: { id: true, role: true },
        });
      }

      return exisitingUser;
    }

    try {
      return await prisma.user.create({
        data: { email, authId, isEmailVerified: emailVerified },
        select: { id: true, role: true },
      });
    } catch (error) {
      // TODO : this is not bullet proof it can cause an infinite loop
      // Two concurrent first sign-ins can both reach this create. The loser re-reads the winner's row.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaExceptionCodes.UNIQUE_CONSTRAINT
      ) {
        return this.resolveOauthUser(authId, email, emailVerified);
      }
      throw error;
    }
  }
}

export const authService = new AuthService();
