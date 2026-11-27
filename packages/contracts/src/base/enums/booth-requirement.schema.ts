import { BoothRequirement } from '@excellense/db/prisma/enums';
import { z } from 'zod';

const boothRequirementSchema = z.enum(BoothRequirement).meta({
  id: 'BoothRequirement',
  description: 'BoothRequirement enum',
});

export default boothRequirementSchema;
