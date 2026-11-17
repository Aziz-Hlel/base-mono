import prisma from '@/db';
import PrismaExceptionCodes from '@/db/PrismaExceptionCodes';
import { BadRequestException } from '@/exceptions';
import type { CreateProfileReq } from '@base-monorepo-v2/contracts/schemas/profile/create-profile.req';
import type { UpdateProfileReq } from '@base-monorepo-v2/contracts/schemas/profile/update-profile.req';
import { Prisma } from '@base-monorepo-v2/db/prisma';
import type { AccessTokenPayload } from '../auth/jwt.service';
import { ProfileMapper } from './profile.mapper';

class ProfileService {
  createMe = async (user: AccessTokenPayload, input: CreateProfileReq) => {
    try {
      const createProfile = await prisma.profile.create({
        data: {
          id: user.id,
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          gender: input.gender,
          birthday: input.birthday,
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
      include: {
        avatar: true,
      },
    });

    const response = ProfileMapper.toRes(updateProfile);

    return response;
  };
}

export const profileService = new ProfileService();
