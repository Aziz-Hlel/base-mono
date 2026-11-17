import type { ProfileMinimalRes } from '@base-monorepo-v2/contracts/schemas/profile/profile-minimal.res';
import type { ProfileRes } from '@base-monorepo-v2/contracts/schemas/profile/profile.res';
import { toISODate } from '@base-monorepo-v2/contracts/utils/dayjs/utc';
import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { mediaService } from '../media/media.service';

export class ProfileMapper {
  static toRes = (profile: Prisma.ProfileGetPayload<{ include: { avatar: true } }>): ProfileRes => {
    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      phone: profile.phone,
      birthday: toISODate(profile.birthday),
      role: profile.role,
      avatar: mediaService.toMediaRes(profile.avatar),
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
  };

  static toMinimalRes = (
    profile: Prisma.ProfileGetPayload<{ include: { avatar: true } }>,
  ): ProfileMinimalRes => ({
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    avatar: mediaService.toMediaRes(profile.avatar),
  });
}
