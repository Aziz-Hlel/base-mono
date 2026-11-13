import type { ProfileRes } from '@base-monorepo-v2/contracts/schemas/profile/profile.res';
import { toISODate } from '@base-monorepo-v2/contracts/utils/dayjs/utc';
import type { Profile } from '@base-monorepo-v2/db/prisma';

export class ProfileMapper {
  static toRes = (profile: Profile): ProfileRes => {
    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      phone: profile.phone,
      birthday: toISODate(profile.birthday),
      role: profile.role,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
  };
}
