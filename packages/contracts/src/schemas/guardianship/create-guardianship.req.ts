import { z } from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const createGuardianshipReqSchema = z
  .object({
    email: userBaseSchema.email,
  })
  .meta({
    id: 'CreateGuardianshipReq',
    description: 'Email of the patient the guardian wants to link with',
  });

export type CreateGuardianshipReq = z.infer<typeof createGuardianshipReqSchema>;
