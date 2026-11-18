import { z } from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const linkPatientGuardianReqSchema = z
  .object({
    email: userBaseSchema.email,
  })
  .meta({
    id: 'LinkPatientGuardianReq',
    description: 'Email of the patient to link with the guardian',
  });

export type LinkPatientGuardianReq = z.infer<typeof linkPatientGuardianReqSchema>;
