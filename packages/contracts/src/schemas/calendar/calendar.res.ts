import { z } from 'zod';
import { calendarBaseSchema } from '../../base/calendar.base-schema';

export const calendarResSchema = z
  .object({
    id: calendarBaseSchema.id,
    title: calendarBaseSchema.title,
    description: calendarBaseSchema.description,
    type: calendarBaseSchema.type,
    doctorName: calendarBaseSchema.doctorName,
    clinicName: calendarBaseSchema.clinicName,
    startDate: calendarBaseSchema.startDate,
    endDate: calendarBaseSchema.endDate,
  })
  .meta({
    id: 'CalendarRes',
  });

export type CalendarRes = z.infer<typeof calendarResSchema>;
