import type { GuardianMinimalWithPatientsRes } from '@base-monorepo-v2/contracts/schemas/guardian/guardian-minimal-with-patients.res';
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
        guardianships: {
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
      patients: guardian.guardianships.map((guardianship) =>
        PatientMapper.toMinimalRes(guardianship.patient),
      ),
      createdAt: guardian.createdAt.toISOString(),
      updatedAt: guardian.updatedAt.toISOString(),
    };
  };

  static toMinimalWithPatientsRes = (
    guardian: Prisma.GuardianGetPayload<{
      include: {
        profile: {
          include: {
            user: true;
            avatar: true;
          };
        };
        guardianships: {
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
  ): GuardianMinimalWithPatientsRes => {
    return {
      id: guardian.id,
      user: UserMapper.toMinimalRes(guardian.profile.user),
      profile: ProfileMapper.toMinimalRes(guardian.profile),
      patients: guardian.guardianships.map((guardianship) =>
        PatientMapper.toMinimalRes(guardianship.patient),
      ),
      createdAt: guardian.createdAt.toISOString(),
      updatedAt: guardian.updatedAt.toISOString(),
    };
  };
}
