import type { GuardianshipRes } from '@base-monorepo-v2/contracts/schemas/guardianship/guardianship.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';

export class GuardianshipMapper {
  static toRes = (guardianship: Prisma.GuardianshipGetPayload<{}>): GuardianshipRes => {
    return {
      id: guardianship.id,
      relationship: guardianship.relationship,
      linkStatus: guardianship.linkStatus,
      canViewMedicalInfo: guardianship.canViewMedicalInfo,
      canManageAppointments: guardianship.canManageAppointments,
      canManageMedications: guardianship.canManageMedications,
      receivesNotifications: guardianship.receivesNotifications,
      guardianId: guardianship.guardianId,
      patientId: guardianship.patientId,
    };
  };
}
