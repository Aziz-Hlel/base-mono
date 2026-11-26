import z from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const updateUserReqSchema = z
  .object({
    password: userBaseSchema.password,
    username: userBaseSchema.username,
  })
  .meta({
    id: 'UpdateUserReq',
  });

export type UpdateUserReq = z.infer<typeof updateUserReqSchema>;
