import { SymptomPattern } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const symptomPatternSchema = z.enum(SymptomPattern).meta({
  id: 'SymptomPattern',
  description: 'SymptomPattern enum',
});

export default symptomPatternSchema;
