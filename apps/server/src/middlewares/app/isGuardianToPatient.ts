import prisma from '@/db';
import { ForbiddenException } from '@/exceptions';
import type { AuthRequest } from '@/types/api/authRequest';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import { GuardianLinkStatus } from '@base-monorepo-v2/db/prisma';
import type { NextFunction, Response } from 'express';

const isGuardianToPatient =
  (patientIdKey: string) => async (req: AuthRequest, _: Response, next: NextFunction) => {
    const guardianId = req.user?.id;
    const patientId = req.params[patientIdKey] as string;

    const guardianship = await prisma.guardianship.findUnique({
      where: {
        guardianId_patientId: {
          guardianId,
          patientId,
        },
        linkStatus: GuardianLinkStatus.ACCEPTED,
      },
      select: {
        id: true,
      },
    });

    if (!guardianship) {
      throw new ForbiddenException('No active guardianship found for this patient', {
        code: ERROR_CODES.GUARDIANSHIP.NOT_FOUND,
      });
    }

    return next();
  };

export default isGuardianToPatient;
