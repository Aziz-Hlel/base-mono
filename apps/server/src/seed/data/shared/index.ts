import type { Prisma } from '@excellense/db/prisma';
import { UserRole } from '@excellense/db/prisma/enums';
import { genUuid } from '../../helper/generateUuid';

export const adminSeedData: Prisma.UserCreateManyInput[] = [
  {
    id: genUuid('tigana'),
    email: 'tigana137@gmail.com',
    password: '12345678',
    isEmailVerified: true,
    role: UserRole.ADMIN,
    username: 'Tigana',
  },
  {
    id: genUuid('admin'),
    email: 'm.aziz.hlel@gmail.com',
    password: '12345678',
    isEmailVerified: true,
    role: UserRole.ADMIN,
    username: 'Tigana',
  },
];
