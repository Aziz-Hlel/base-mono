import { z } from 'zod';
import { userBaseSchema } from '../../base/user.base-schema';

export const linkGuardianPatientReqSchema = z
  .object({
    email: userBaseSchema.email,
  })
  .meta({
    id: 'LinkGuardianPatientReq',
    description: 'Email of the guardian to link with the patient',
  });

export type LinkGuardianPatientReq = z.infer<typeof linkGuardianPatientReqSchema>;
