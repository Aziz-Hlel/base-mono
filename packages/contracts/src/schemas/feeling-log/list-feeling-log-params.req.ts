import z from 'zod';
import { patientBaseSchema } from '../../base/patient.base-schema';

export const listFeelingLogParamsSchema = z
  .object({
    patientId: patientBaseSchema.id,
  })
  .meta({
    id: 'listFeelingLogParamsSchema',
  });

export type ListFeelingLogParamsReq = z.infer<typeof listFeelingLogParamsSchema>;
