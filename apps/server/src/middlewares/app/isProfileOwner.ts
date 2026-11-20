import { ForbiddenException } from '@/exceptions';
import type { AuthRequest } from '@/types/api/authRequest';
import type { NextFunction, Response } from 'express';
import z from 'zod';

const isProfileOwner = (profileIdKey: string = 'profileId') => {
  return async (req: AuthRequest, _: Response, next: NextFunction) => {
    const profileId = z.uuid().parse(req.params[profileIdKey]);

    if (req.user.id === profileId) return next();

    throw new ForbiddenException('You can only access your own profile resources');
  };
};

export default isProfileOwner;
