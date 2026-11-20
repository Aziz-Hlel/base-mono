import { UserRole, UserStatus } from '@base-monorepo-v2/db/prisma';
import type { UserCreateInput } from '../../../../../../packages/db/prisma/generated/models';
import { genUuid } from '../../helper/generateUuid';

export const systemSeedData: UserCreateInput = {
  id: genUuid('sys'),
  email: 'system@gmail.com',
  password: null,
  isEmailVerified: true,
  role: UserRole.SYSTEM,
  status: UserStatus.ACTIVE,
  username: 'system',
};

export const adminSeedData: UserCreateInput[] = [
  {
    id: genUuid('admin'),
    email: 'm.aziz.hlel@gmail.com',
    password: '12345678',
    isEmailVerified: true,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    username: 'Tigana',
  },
];
