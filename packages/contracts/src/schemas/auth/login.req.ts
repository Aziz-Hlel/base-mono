import z from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const loginSchema = z
  .object({
    email: userBaseSchema.email,
    password: userBaseSchema.password,
  })
  .meta({ id: 'LoginInput' });

export type LoginInput = z.infer<typeof loginSchema>;
