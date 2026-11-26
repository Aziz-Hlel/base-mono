import { z } from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const userResSchema = z
  .object({
    id: userBaseSchema.id,
    email: userBaseSchema.email,
    role: userBaseSchema.role,
    username: userBaseSchema.username,
    isEmailVerified: userBaseSchema.isEmailVerified,
    createdAt: userBaseSchema.createdAt,
    updatedAt: userBaseSchema.updatedAt,
  })
  .meta({
    id: 'UserRes',
  });

export type UserRes = z.infer<typeof userResSchema>;
