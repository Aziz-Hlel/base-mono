import { z } from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const userMinimalResSchema = z
  .object({
    id: userBaseSchema.id,
    email: userBaseSchema.email,
    username: userBaseSchema.username,
  })
  .meta({
    id: 'UserMinimalRes',
  });

export type UserMinimalRes = z.infer<typeof userMinimalResSchema>;
