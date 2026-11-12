import { CancerStage } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const cancerStageSchema = z.enum(CancerStage).meta({
  id: 'CancerStage',
  description: 'CancerStage enum',
});

export default cancerStageSchema;
