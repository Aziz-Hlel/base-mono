import type { PatientDetailedRes } from '@base-monorepo-v2/contracts/schemas/patient/patient-detailed.res';
import type { PatientMinimalRes } from '@base-monorepo-v2/contracts/schemas/patient/patient-minimal.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { ProfileMapper } from '../profile/profile.mapper';
import { UserMapper } from '../users/user.mapper';

export class PatientMapper {
  static toDetailedRes = (
    patient: Prisma.PatientGetPayload<{
      include: {
        profile: {
          include: {
            user: true;
            avatar: true;
          };
        };
      };
    }>,
  ): PatientDetailedRes => ({
    id: patient.id,
    cancerType: patient.cancerType,
    cancerSubtype: patient.cancerSubtype,
    cancerStage: patient.cancerStage,
    journeyStage: patient.journeyStage,
    allergies: patient.allergies,
    dietaryRestrictions: patient.dietaryRestrictions,
    activityLevel: patient.activityLevel,
    user: UserMapper.toRes(patient.profile.user),
    profile: ProfileMapper.toRes(patient.profile),
    createdAt: patient.createdAt.toISOString(),
    updatedAt: patient.updatedAt.toISOString(),
  });

  static toMinimalRes = (
    patient: Prisma.PatientGetPayload<{
      include: {
        profile: {
          include: {
            user: true;
            avatar: true;
          };
        };
      };
    }>,
  ): PatientMinimalRes => ({
    id: patient.id,
    journeyStage: patient.journeyStage,
    profile: ProfileMapper.toMinimalRes(patient.profile),
    user: UserMapper.toMinimalRes(patient.profile.user),
  });
}
