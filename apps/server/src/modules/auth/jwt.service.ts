import ENV from '@/env';
import type { AccountRole } from '@base-monorepo-v2/db/prisma';
import jwt from 'jsonwebtoken';
import { ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } from './const';

export interface AccessTokenPayload {
  id: string;
  accountRole: AccountRole;
}

export interface RefreshTokenPayload {
  id: string;
  tokenId: string; // unique ID per token, used for rotation detection
}

class JwtService {
  signAccessToken = (payload: AccessTokenPayload): string => {
    return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_EXPIRES_IN,
      algorithm: 'HS256',
    });
  };

  signRefreshToken = (payload: RefreshTokenPayload): string => {
    return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
      algorithm: 'HS256',
    });
  };

  verifyAccessToken = (token: string): AccessTokenPayload => {
    return jwt.verify(token, ENV.JWT_ACCESS_SECRET, {
      algorithms: ['HS256'],
    }) as AccessTokenPayload;
  };

  verifyRefreshToken = (token: string): RefreshTokenPayload => {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET, {
      algorithms: ['HS256'],
    }) as RefreshTokenPayload;
  };

  decodeToken = (token: string): jwt.JwtPayload | null => {
    const decoded = jwt.decode(token);
    return typeof decoded === 'object' ? decoded : null;
  };
}

export const jwtService = new JwtService();
