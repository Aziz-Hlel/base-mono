import type { z } from 'zod';
import { createFeelingLogReqSchema } from './create-feeling-log.req';

export const updateFeelingLogReqSchema = createFeelingLogReqSchema.meta({
  id: 'UpdateFeelingLogReq',
});

export type UpdateFeelingLogReq = z.infer<typeof updateFeelingLogReqSchema>;
