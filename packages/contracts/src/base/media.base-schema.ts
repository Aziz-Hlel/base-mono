import z from 'zod';
import mediaStatusSchema from './enums/media-status.schema';
import mediaTypeSchema from './enums/media-type.schema';
import { zodNullableString, zodString } from './shared/string.zod';

export const mediaBaseSchema = {
  id: z.uuid(),
  key: zodString('Key'),
  baseName: zodString('Base name', { min: 1 }),
  type: mediaTypeSchema,
  mimeType: zodString('MIME type'),
  fileSize: z.int().nonnegative().nullable(),
  status: mediaStatusSchema,
  blurHash: zodNullableString('Blur hash'),
  order: z.int().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
  confirmedAt: z.iso.datetime().nullable(),
};
