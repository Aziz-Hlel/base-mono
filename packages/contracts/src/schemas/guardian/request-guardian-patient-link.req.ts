import { z } from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const requestGuardianPatientLinkReqSchema = z
  .object({
    email: userBaseSchema.email,
  })
  .meta({
    id: 'RequestGuardianPatientLinkReq',
    description: 'Email of the patient the guardian wants to link with',
  });

export type RequestGuardianPatientLinkReq = z.infer<typeof requestGuardianPatientLinkReqSchema>;
