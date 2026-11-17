import type { GuardianMinimalRes } from '@base-monorepo-v2/contracts/schemas/guardian/guardian-minimal.res';
import type { GuardianPatientRes } from '@base-monorepo-v2/contracts/schemas/guardian/guardian-patient.res';
import type { GuardianRes } from '@base-monorepo-v2/contracts/schemas/guardian/guardian.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { PatientMapper } from '../patient/patient.mapper';
import { ProfileMapper } from '../profile/profile.mapper';
import { UserMapper } from '../users/user.mapper';

export class GuardianMapper {
  static toRes = (
    guardian: Prisma.GuardianGetPayload<{
      include: {
        profile: {
          include: {
            user: true;
            avatar: true;
          };
        };
        guardianPatient: {
          include: {
            patient: {
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
        };
      };
    }>,
  ): GuardianRes => {
    return {
      id: guardian.id,
      user: UserMapper.toRes(guardian.profile.user),
      profile: ProfileMapper.toRes(guardian.profile),
      patients: guardian.guardianPatient.map((guardianPatient) =>
        PatientMapper.toMinimalRes(guardianPatient.patient),
      ),
      createdAt: guardian.createdAt.toISOString(),
      updatedAt: guardian.updatedAt.toISOString(),
    };
  };

  static toMinimalRes = (
    guardian: Prisma.GuardianGetPayload<{
      include: {
        profile: {
          include: {
            user: true;
            avatar: true;
          };
        };
        guardianPatient: {
          include: {
            patient: {
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
        };
      };
    }>,
  ): GuardianMinimalRes => {
    return {
      id: guardian.id,
      user: {
        id: guardian.profile.user.id,
        username: guardian.profile.user.username,
        email: guardian.profile.user.email,
      },
      profile: ProfileMapper.toMinimalRes(guardian.profile),
      patients: guardian.guardianPatient.map((guardianPatient) =>
        PatientMapper.toMinimalRes(guardianPatient.patient),
      ),
      createdAt: guardian.createdAt.toISOString(),
      updatedAt: guardian.updatedAt.toISOString(),
    };
  };

  static toGuardianPatientRes = (
    guardianPatient: Prisma.GuardianPatientGetPayload<{}>,
  ): GuardianPatientRes => {
    return {
      id: guardianPatient.id,
      relationship: guardianPatient.relationship,
      linkStatus: guardianPatient.linkStatus,
      canViewMedicalInfo: guardianPatient.canViewMedicalInfo,
      canManageAppointments: guardianPatient.canManageAppointments,
      canManageMedications: guardianPatient.canManageMedications,
      receivesNotifications: guardianPatient.receivesNotifications,
      guardianId: guardianPatient.guardianId,
      patientId: guardianPatient.patientId,
    };
  };
}
