import { z } from 'zod';
import { guardianBaseSchema } from '../../base/guardian.base-schema';
import { patientBaseSchema } from '../../base/patient.base-schema';

export const guardianPatientParamsSchema = z
  .object({
    id: guardianBaseSchema.id,
    patientId: patientBaseSchema.id,
  })
  .meta({
    id: 'GuardianPatientParams',
  });

export type GuardianPatientParams = z.infer<typeof guardianPatientParamsSchema>;
