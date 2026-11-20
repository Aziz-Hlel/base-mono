import prisma from '@/db';
import PrismaExceptionCodes from '@/db/errors/codes';
import { BadRequestException } from '@/exceptions';
import type { CreateProfileReq } from '@base-monorepo-v2/contracts/schemas/profile/create-profile.req';
import type { UpdateProfileReq } from '@base-monorepo-v2/contracts/schemas/profile/update-profile.req';
import { parseISODate } from '@base-monorepo-v2/contracts/utils/dayjs/utc';
import { Prisma } from '@base-monorepo-v2/db/prisma';
import { ProfileMapper } from './profile.mapper';

class ProfileService {
  create = async (userId: string, input: CreateProfileReq) => {
    try {
      const createProfile = await prisma.profile.create({
        data: {
          id: userId,
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          gender: input.gender,
          birthday: parseISODate(input.birthday),
          avatarId: input.avatarId,
        },
        include: {
          avatar: true,
        },
      });

      const response = ProfileMapper.toRes(createProfile);

      return response;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaExceptionCodes.UNIQUE_CONSTRAINT
      ) {
        throw new BadRequestException('Profile already exist');
      }
      throw error;
    }
  };

  update = async (userId: string, input: UpdateProfileReq) => {
    const updateProfile = await prisma.profile.update({
      where: {
        id: userId,
      },
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        gender: input.gender,
        birthday: input.birthday,
        role: null,
      },
      include: {
        avatar: true,
      },
    });

    const response = ProfileMapper.toRes(updateProfile);

    return response;
  };
}

export const profileService = new ProfileService();
