import { DietaryRestriction } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const dietaryRestrictionSchema = z.enum(DietaryRestriction).meta({
  id: 'DietaryRestriction',
  description: 'DietaryRestriction enum',
});

export default dietaryRestrictionSchema;
