import z from 'zod';
import mediaTypeSchema from '../../base/enums/media-type.schema';

export const mediaResponseSchema = z
  .object({
    id: z.uuid(),
    url: z.url(),
    key: z.string(),
    blurHash: z.string().nullable(),
    type: mediaTypeSchema,
  })
  .meta({ id: 'MediaResponse' });

export type MediaResponse = z.infer<typeof mediaResponseSchema>;
