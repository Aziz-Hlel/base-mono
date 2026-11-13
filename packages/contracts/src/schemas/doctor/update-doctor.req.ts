import type { z } from 'zod';
import { createDoctorReqSchema } from './create-doctor.req';

export const updateDoctorReqSchema = createDoctorReqSchema.meta({
  id: 'UpdateDoctorReq',
});

export type UpdateDoctorReq = z.infer<typeof updateDoctorReqSchema>;
