import { UserRole } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const userRoleSchema = z.enum(UserRole).meta({
  id: 'UserRole',
  description: 'UserRole enum',
});

export default userRoleSchema;
