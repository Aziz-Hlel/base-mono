import { z } from 'zod';
import { feelingLogBaseSchema } from '../../base/feeling-log.base-schema';

export const feelingLogIdParamSchema = z
  .object({
    id: feelingLogBaseSchema.id,
  })
  .meta({
    id: 'FeelingLogIdParam',
  });

export type FeelingLogIdParam = z.infer<typeof feelingLogIdParamSchema>;
