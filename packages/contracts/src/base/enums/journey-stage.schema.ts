import { JourneyStage } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const journeyStageSchema = z.enum(JourneyStage).meta({
  id: 'JourneyStage',
  description: 'JourneyStage enum',
});

export default journeyStageSchema;
