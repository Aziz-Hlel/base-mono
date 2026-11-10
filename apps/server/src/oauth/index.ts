import { UnauthorizedException } from '@/exceptions';
import { firebaseProvider } from '@/firebase';
import { handleFirebaseInfraException } from '@/firebase/infraExceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import { AuthErrorCode, FirebaseAuthError, type DecodedIdToken } from 'firebase-admin/auth';

export class OAuthProvider {
  private readonly auth = firebaseProvider.getAuth();

  private isTokenFormatValid = (token: string) => {
    return typeof token === 'string' && token.split('.').length === 3;
  };

  verifyToken = async (token: string): Promise<DecodedIdToken> => {
    try {
      if (!this.isTokenFormatValid(token)) {
        throw new UnauthorizedException('Invalid token');
      }
      // checkRevoked: without it Firebase never raises ID_TOKEN_REVOKED or USER_DISABLED.
      const firebaseToken = await this.auth.verifyIdToken(token, true);

      return {
        ...firebaseToken,
        email: firebaseToken.email?.toLocaleLowerCase(),
      };
    } catch (error: unknown) {
      if (error instanceof FirebaseAuthError) {
        handleFirebaseInfraException(error);
        switch (error.code) {
          case AuthErrorCode.ID_TOKEN_EXPIRED:
          case AuthErrorCode.ID_TOKEN_REVOKED:
          case AuthErrorCode.INVALID_ID_TOKEN:
            throw new UnauthorizedException('Invalid token', {
              cause: error,
              code: ERROR_CODES.AUTH.INVALID_TOKEN,
            });
          case AuthErrorCode.USER_DISABLED:
            throw new UnauthorizedException('User account has been disabled', {
              cause: error,
              code: ERROR_CODES.AUTH.USER_DISABLED,
            });
        }
      }
      throw error;
    }
  };

  updateUserPassword = async (authId: string, newPassword: string) => {
    try {
      await this.auth.updateUser(authId, { password: newPassword });
    } catch (error: unknown) {
      throw error;
    }
  };

  deleteAllUsers = async () => {
    let nextPageToken: string | undefined = undefined;

    do {
      const result = await this.auth.listUsers(1000, nextPageToken);

      const uids = result.users.map((user) => user.uid);

      if (uids.length > 0) {
        await this.auth.deleteUsers(uids);
      }

      nextPageToken = result.pageToken;
    } while (nextPageToken);
  };
}

export const oauthProvider = new OAuthProvider();
