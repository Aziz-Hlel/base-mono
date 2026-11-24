import { ForbiddenException } from '@/exceptions';
import isAdmin from '@/middlewares/app/utils/isAdmin';
import { guardianshipService } from '@/modules/guardianship/guardianship.service';
import type { AuthRequest } from '@/types/api/authRequest';
import type { NextFunction, Response } from 'express';
import z from 'zod';

const canReadPatientFeelingLogs = (patientIdKey: string = 'patientId') => {
  return async (req: AuthRequest, _: Response, next: NextFunction) => {
    if (isAdmin(req)) return next();

    const userId = req.user.id;
    const patientIdUnsanitized = req.params[patientIdKey] as string;
    const patientId = z.uuid().parse(patientIdUnsanitized);

    if (userId === patientId) return next();

    const guardianship = await guardianshipService.getByPatientIdAndGuardianId(patientId, userId);

    if (guardianship && guardianship.canViewFeelingLogs) return next();

    throw new ForbiddenException('You dont have access to this patients logs');
  };
};

export default canReadPatientFeelingLogs;
