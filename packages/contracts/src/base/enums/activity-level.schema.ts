import { ActivityLevel } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const activityLevelSchema = z.enum(ActivityLevel).meta({
  id: 'ActivityLevel',
  description: 'ActivityLevel enum',
});

export default activityLevelSchema;
