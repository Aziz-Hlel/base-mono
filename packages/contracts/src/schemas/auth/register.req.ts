import z from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const registerSchema = z.object({
  username: userBaseSchema.username,
  email: userBaseSchema.email,
  password: userBaseSchema.password,
});

export type RegisterInput = z.infer<typeof registerSchema>;
