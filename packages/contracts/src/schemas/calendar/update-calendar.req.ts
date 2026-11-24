import { z } from 'zod';
import { createCalendarReqSchema } from './create-calendar.req';

export const updateCalendarReqSchema = createCalendarReqSchema.meta({
  id: 'UpdateCalendarReq',
});

export type UpdateCalendarReq = z.infer<typeof updateCalendarReqSchema>;
