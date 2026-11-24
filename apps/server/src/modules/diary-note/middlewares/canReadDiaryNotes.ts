import { ForbiddenException } from '@/exceptions';
import isAdmin from '@/middlewares/app/utils/isAdmin';
import { guardianshipService } from '@/modules/guardianship/guardianship.service';
import type { AuthRequest } from '@/types/api/authRequest';
import type { NextFunction, Response } from 'express';
import z from 'zod';

const canReadDiaryNotes = (profileIdKey: string = 'patientId') => {
  return async (req: AuthRequest, _: Response, next: NextFunction) => {
    if (isAdmin(req)) return next();

    const userId = req.user.id;
    const profileIdUnsanitized = req.params[profileIdKey] as string;
    const profileId = z.uuid().parse(profileIdUnsanitized);

    if (userId === profileId) return next();

    const guardianship = await guardianshipService.getByPatientIdAndGuardianId(profileId, userId);

    if (guardianship && guardianship.canViewDiaryNotes) return next();

    throw new ForbiddenException('You dont have access to this profile diary ');
  };
};

export default canReadDiaryNotes;
