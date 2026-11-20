import { z } from 'zod';
import { patientMinimalResSchema } from '../patient/patient-minimal.res';

export const listGuardianPatientsResSchema = z.array(patientMinimalResSchema).meta({
  id: 'ListGuardianPatientsRes',
  description: 'List of patients linked to a guardian',
});

export type ListGuardianPatientsRes = z.infer<typeof listGuardianPatientsResSchema>;
