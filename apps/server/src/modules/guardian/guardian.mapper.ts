import type { GuardianMinimalRes } from '@base-monorepo-v2/contracts/schemas/guardian/guardian-minimal.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';

export class GuardianMapper {
  static toMinimalRes = (
    guardian: Prisma.GuardianGetPayload<{
      include: {
        profile: {
          include: {
            user: true;
          };
        };
      };
    }>,
  ): GuardianMinimalRes => {
    return {
      id: guardian.id,
      user: userMinimalResSchema,
      profile: profileMinimalResSchema,
      patients: z.array(patientMinimalResSchema),
      createdAt: guardian.createdAt.toISOString(),
      updatedAt: guardian.updatedAt.toISOString(),
    };
  };
}
