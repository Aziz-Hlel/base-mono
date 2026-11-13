import { ConflictException } from '@/exceptions';
import type { AuthRequest } from '@/types/api/authRequest';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import { UserRole } from '@base-monorepo-v2/db/prisma';
import type { NextFunction, Response } from 'express';

const requireUserRoles = (requiredRoles: UserRole[]) => {
  return async (req: AuthRequest, _: Response, next: NextFunction) => {
    const user = req.user;
    if (user.role === UserRole.SUPER_ADMIN) {
      return next();
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ConflictException('Insufficient permission to perform this action', {
        code: ERROR_CODES.AUTH.INSUFFICIENT_PERMISSION,
        debug: {
          role: user.role,
          requiredRoles,
        },
      });
    }

    return next();
  };
};

export default requireUserRoles;
