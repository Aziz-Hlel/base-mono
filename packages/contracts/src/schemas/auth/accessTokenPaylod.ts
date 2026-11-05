import { AccountRole } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

export const accessTokenPayloadSchema = z.object({
  id: z.uuid(),
  role: z.enum(AccountRole),
});

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
