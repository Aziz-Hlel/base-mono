import { CancerType } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const cancerTypeSchema = z.enum(CancerType).meta({
  id: 'CancerType',
  description: 'CancerType enum',
});

export default cancerTypeSchema;
