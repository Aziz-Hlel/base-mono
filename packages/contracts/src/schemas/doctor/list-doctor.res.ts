import { z } from 'zod';
import { doctorMinimalResSchema } from './doctor-minimal.res';

export const listDoctorResSchema = z.array(doctorMinimalResSchema).meta({
  id: 'ListDoctorRes',
  description: 'List of doctors in minimal representation',
});

export type ListDoctorRes = z.infer<typeof listDoctorResSchema>;
