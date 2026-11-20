import prisma from '@/db';
import { ForbiddenException } from '@/exceptions';
import type { AuthRequest } from '@/types/api/authRequest';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import type { NextFunction, Response } from 'express';

const isPatientOrAdmin = async (req: AuthRequest, _: Response, next: NextFunction) => {
  const isAdmin = allAdminRoles.some((role) => role === req.user.role);

  if (isAdmin) return next();

  const userId = req.user.id;

  const patient = await prisma.patient.findUnique({
    where: {
      id: userId,
    },
  });
  if (!patient) return next(new ForbiddenException());

  return next();
};

export default isPatientOrAdmin;
