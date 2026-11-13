import z from 'zod';
import devicePlatformSchema from './enums/device-platform.schema';
import devicePreferredLanguageSchema from './enums/device-preferred-language.schema';
import { zodNullableString, zodString } from './shared/string.zod';

export const deviceBaseSchema = {
  id: z.uuid(),
  fid: zodString('FID'),
  userId: z.uuid(),
  platform: devicePlatformSchema,
  appVersion: zodNullableString('App version'),
  buildNumber: zodNullableString('Build number'),
  osVersion: zodNullableString('OS version'),
  model: zodNullableString('Model'),
  manufacturer: zodNullableString('Manufacturer'),
  language: devicePreferredLanguageSchema,
  locale: zodNullableString('Locale'),
  timezone: zodNullableString('Timezone'),
  lastSeenAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
