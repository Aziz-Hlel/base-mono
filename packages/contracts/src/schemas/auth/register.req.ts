import z from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const registerSchema = z
  .object({
    email: userBaseSchema.email,
    password: userBaseSchema.password,
  })
  .meta({
    id: 'Register Input',
    description: 'Request schema for user registration',
  });

export type RegisterInput = z.infer<typeof registerSchema>;
