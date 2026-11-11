import type { UserRole } from '@base-monorepo-v2/db/prisma';
import type { Request } from 'express';

export type AuthRequest = Request & {
  user: {
    id: string;
    role: UserRole;
  };
};
