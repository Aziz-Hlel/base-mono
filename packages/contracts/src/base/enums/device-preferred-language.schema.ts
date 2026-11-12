import { DevicePreferredLanguage } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const devicePreferredLanguageSchema = z.enum(DevicePreferredLanguage).meta({
  id: 'DevicePreferredLanguage',
  description: 'DevicePreferredLanguage enum',
});

export default devicePreferredLanguageSchema;
