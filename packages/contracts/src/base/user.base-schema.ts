import z from 'zod';
import userRoleSchema from './enums/user-role.schema';
import userStatusSchema from './enums/user-status.schema';
import { zodNullableString } from './shared/string.zod';
import { zodEmail } from './shared/zodEmail';

export const userBaseSchema = {
  id: z.uuid(),
  email: zodEmail(),
  password: z
    .string('Password is required')
    // Unicode-normalize first so visually identical input (é vs e+◌́, full-width
    // letters, NBSP) hashes the same on every device; later checks see the final value
    .normalize('NFKC')
    .min(1, 'Password must not be empty')
    .min(8, 'Password must be at least 8 characters')
    .refine((pw) => pw.trim().length > 0, 'Password must not be only spaces')
    .refine(
      (pw) => !/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}\p{Co}\p{Cs}\p{Cn}]/u.test(pw),
      'Password contains invisible or unsupported characters',
    )
    .refine(
      // bcrypt silently truncates input beyond 72 bytes (not characters)
      (pw) => new TextEncoder().encode(pw).length <= 72,
      'Password is too long (max 72 bytes; some characters use more than one)',
    ),

  role: userRoleSchema,
  authId: zodNullableString('Auth ID'),
  username: zodNullableString('Username'),
  isEmailVerified: z.boolean(),
  status: userStatusSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
