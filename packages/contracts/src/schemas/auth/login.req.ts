import z from 'zod';
import { accountBaseSchema } from '../../base/account.base-schema';

export const loginSchema = z
  .object({
    email: accountBaseSchema.email,
    password: accountBaseSchema.password,
  })
  .meta({ id: 'LoginInput' });

export type LoginInput = z.infer<typeof loginSchema>;
