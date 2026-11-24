import { z } from 'zod';
import { calendarBaseSchema } from '../../base/calendar.base-schema';

export const createCalendarReqSchema = z
  .object({
    title: calendarBaseSchema.title,
    description: calendarBaseSchema.description,
    type: calendarBaseSchema.type,
    doctorName: calendarBaseSchema.doctorName,
    clinicName: calendarBaseSchema.clinicName,
    startDate: calendarBaseSchema.startDate,
    endDate: calendarBaseSchema.endDate,
  })
  .meta({
    id: 'CreateCalendarReq',
  });

export type CreateCalendarReq = z.infer<typeof createCalendarReqSchema>;
