import z from 'zod';
import { accountBaseSchema } from '../../base/account.base-schema';

export const registerSchema = z.object({
  email: accountBaseSchema.email,
  password: accountBaseSchema.password,
});

export type RegisterInput = z.infer<typeof registerSchema>;
