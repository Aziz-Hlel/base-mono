import prisma from '@/db';
import { ForbiddenException } from '@/exceptions';
import type { AuthRequest } from '@/types/api/authRequest';
import type { NextFunction, Response } from 'express';

const isPatient = async (req: AuthRequest, _: Response, next: NextFunction) => {
  const userId = req.user.id;

  const patient = await prisma.patient.findUnique({
    where: {
      id: userId,
    },
  });
  if (!patient) return next(new ForbiddenException('Only patients can perform this action'));

  return next();
};

export default isPatient;
