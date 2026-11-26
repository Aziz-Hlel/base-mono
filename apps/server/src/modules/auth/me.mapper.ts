import type { MeRes } from '@excellense/contracts/schemas/auth/me.res';
import type { User } from '@excellense/db/prisma';
import { UserMapper } from '../users/user.mapper';

export class MeMapper {
  static toRes = (user: User): MeRes => ({
    user: UserMapper.toRes(user),
  });
}
