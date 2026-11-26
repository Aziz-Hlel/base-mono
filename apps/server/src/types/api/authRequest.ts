import type { UserRole } from '@excellense/db/prisma';
import type { Request } from 'express';

export type AuthRequest = Request & {
  user: {
    id: string;
    role: UserRole;
  };
};
