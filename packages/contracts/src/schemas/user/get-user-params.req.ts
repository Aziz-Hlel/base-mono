import { z } from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const userIdParamSchema = z
  .object({
    id: userBaseSchema.id,
  })
  .meta({
    id: 'UserIdParam',
  });

export type UserIdParam = z.infer<typeof userIdParamSchema>;
