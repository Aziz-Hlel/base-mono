import z from 'zod';
import userRoleSchema from './enums/user-role.schema';
import userStatusSchema from './enums/user-status.schema';
import { zodEmail } from './shared/zodEmail';
import { zodNullableString } from './shared/string.zod';

export const userBaseSchema = {
  id: z.uuid(),
  email: zodEmail(),
  password: z
    .string('Password is required')
    .trim()
    .min(1, 'Password must not be empty')
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be at most 72 characters'),

  role: userRoleSchema,
  authId: z.string(),
  username: zodNullableString('Username'),
  isVerified: z.boolean(),
  status: userStatusSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
