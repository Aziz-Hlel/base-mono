import { z } from 'zod';
import userRoleSchema from '../../base/enums/user-role.schema';

export const accessTokenPayloadSchema = z
  .object({
    id: z.uuid(),
    role: userRoleSchema,
  })
  .meta({
    id: 'AccessTokenPayload',
  });

export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;
