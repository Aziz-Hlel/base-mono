import { UserRole } from '@excellense/db/prisma';
import { z } from 'zod';

export const accessTokenPayloadSchema = z.object({
  id: z.uuid(),
  role: z.enum(UserRole),
});

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
