import { z } from 'zod';
import { registerSchema } from '../auth/register.req';
import { createProfileReqSchema } from '../profile/create-profile.req';
import { createPatientReqSchema } from './create-patient.req';

export const createFullPatientReqSchema = z
  .object({
    user: registerSchema,
    profile: createProfileReqSchema,
    patient: createPatientReqSchema,
  })
  .meta({
    id: 'CreateFullPatientReq',
    description:
      'Request schema for admin-created patient (creates user + profile + patient in one shot)',
  });

export type CreateFullPatientReq = z.infer<typeof createFullPatientReqSchema>;
