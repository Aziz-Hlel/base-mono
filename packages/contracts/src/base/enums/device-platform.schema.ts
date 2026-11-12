import { DevicePlatform } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const devicePlatformSchema = z.enum(DevicePlatform).meta({
  id: 'DevicePlatform',
  description: 'DevicePlatform enum',
});

export default devicePlatformSchema;
