import type { GuardianshipRes } from '@base-monorepo-v2/contracts/schemas/guardianship/guardianship.res';
import type { PatientGuardianRes } from '@base-monorepo-v2/contracts/schemas/patient/patient-guardian.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { GuardianMapper } from '../guardian/guardian.mapper';

export class GuardianshipMapper {
  static toRes = (guardianship: Prisma.GuardianshipGetPayload<{}>): GuardianshipRes => {
    return {
      id: guardianship.id,
      relationship: guardianship.relationship,
      linkStatus: guardianship.linkStatus,
      canViewFeelingLogs: guardianship.canViewFeelingLogs,
      canViewMedicalInfo: guardianship.canViewMedicalInfo,
      canManageAppointments: guardianship.canManageAppointments,
      canManageMedications: guardianship.canManageMedications,
      receivesNotifications: guardianship.receivesNotifications,
    };
  };

  static toPatientGuardianRes = (
    guardianship: Prisma.GuardianshipGetPayload<{
      include: {
        guardian: {
          include: {
            profile: {
              include: {
                user: true;
                avatar: true;
              };
            };
          };
        };
      };
    }>,
  ): PatientGuardianRes => {
    return {
      id: guardianship.id,
      relationship: guardianship.relationship,
      linkStatus: guardianship.linkStatus,
      canViewFeelingLogs: guardianship.canViewFeelingLogs,
      canViewMedicalInfo: guardianship.canViewMedicalInfo,
      canManageAppointments: guardianship.canManageAppointments,
      canManageMedications: guardianship.canManageMedications,
      receivesNotifications: guardianship.receivesNotifications,
      guardian: GuardianMapper.toMinimalRes(guardianship.guardian),
    };
  };
}
