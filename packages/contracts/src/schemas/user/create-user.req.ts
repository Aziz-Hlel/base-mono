import { z } from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const createUserReqSchema = z
  .object({
    email: userBaseSchema.email,
    password: userBaseSchema.password,
    username: userBaseSchema.username,
  })
  .meta({
    id: 'CreateUserReq',
  });

export type CreateUserReq = z.infer<typeof createUserReqSchema>;
