import { MedicalSpecialty } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const medicalSpecialtySchema = z.enum(MedicalSpecialty).meta({
  id: 'MedicalSpecialty',
  description: 'MedicalSpecialty enum',
});

export default medicalSpecialtySchema;
