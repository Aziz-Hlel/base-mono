import { UserStatus } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const userStatusSchema = z.enum(UserStatus).meta({
  id: 'UserStatus',
  description: 'UserStatus enum',
});

export default userStatusSchema;
