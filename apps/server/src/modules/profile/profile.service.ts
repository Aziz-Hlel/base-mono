import prisma from '@/db';
import type { UpdateProfileReq } from '@base-monorepo-v2/contracts/schemas/profile/update-profile.req';
import type { AccessTokenPayload } from '../auth/jwt.service';
import { ProfileMapper } from './profile.mapper';

class ProfileService {
  updateMe = async (user: AccessTokenPayload, input: UpdateProfileReq) => {
    const updateProfile = await prisma.profile.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        gender: input.gender,
        birthday: input.birthday,
        role: null,
      },
    });

    const response = ProfileMapper.toRes(updateProfile);

    return response;
  };
}

export const profileService = new ProfileService();
