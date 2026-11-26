import type { UserMinimalRes } from '@excellense/contracts/schemas/user/user-minimal.res';
import type { UserRes } from '@excellense/contracts/schemas/user/user.res';
import type { User } from '@excellense/db/prisma';

export class UserMapper {
  static toRes = (user: User): UserRes => ({
    id: user.id,
    email: user.email,
    role: user.role,
    username: user.username,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  });

  static toMinimalRes = (user: Pick<User, 'id' | 'email' | 'username'>): UserMinimalRes => ({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}
