import { SymptomOnset } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const symptomOnsetSchema = z.enum(SymptomOnset).meta({
  id: 'SymptomOnset',
  description: 'SymptomOnset enum',
});

export default symptomOnsetSchema;
