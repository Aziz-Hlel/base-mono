import type { z } from 'zod';
import { createPatientReqSchema } from './create-patient.req';

export const updatePatientReqSchema = createPatientReqSchema.meta({
  id: 'UpdatePatientReq',
});

export type UpdatePatientReq = z.infer<typeof updatePatientReqSchema>;
