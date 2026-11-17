import prisma from '@/db';
import { NotFoundException } from '@/exceptions';
import { passwordService } from '@/modules/auth/password.service';
import type { UpdateUserReq } from '@base-monorepo-v2/contracts/schemas/user/update-user.req';
import { UserMapper } from './user.mapper';

class UserService {
  getMe = async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return UserMapper.toRes(user);
  };

  update = async (id: string, data: UpdateUserReq) => {
    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const hashedPassword = await passwordService.hashPassword(data.password);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });

    return UserMapper.toRes(updatedUser);
  };
}

export const userService = new UserService();
