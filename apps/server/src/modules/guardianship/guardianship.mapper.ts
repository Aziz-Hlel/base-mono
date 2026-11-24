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
      canViewDiaryNotes: guardianship.canViewDiaryNotes,
      canViewMedicalInfo: guardianship.canViewMedicalInfo,
      canViewAppointments: guardianship.canViewAppointments,
      canViewMedications: guardianship.canViewMedications,
      canReceiveNotifications: guardianship.canReceiveNotifications,
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
      canViewAppointments: guardianship.canViewAppointments,
      canViewMedications: guardianship.canViewMedications,
      canReceiveNotifications: guardianship.canReceiveNotifications,
      guardian: GuardianMapper.toMinimalRes(guardianship.guardian),
    };
  };
}
