import { FeelingSymptom } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const feelingSymptomSchema = z.enum(FeelingSymptom).meta({
  id: 'FeelingSymptom',
  description: 'FeelingSymptom enum',
});

export default feelingSymptomSchema;
