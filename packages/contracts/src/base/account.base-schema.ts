import z from 'zod';
import { AccountRole, AccountStatus } from '../enums';
import { zodEmail } from './shared/zodEmail';

export const accountBaseSchema = {
  id: z.uuid(),
  email: zodEmail(),
  password: z
    .string('Password is required')
    .trim()
    .min(1, 'Password must not be empty')
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be at most 72 characters'),

  role: z.enum(AccountRole),
  status: z.enum(AccountStatus),
};
