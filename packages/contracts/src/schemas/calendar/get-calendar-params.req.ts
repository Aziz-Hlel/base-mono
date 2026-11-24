import { z } from 'zod';
import { calendarBaseSchema } from '../../base/calendar.base-schema';

// /patients/:patientId/calendars/:id
export const calendarIdParamSchema = z
  .object({
    patientId: calendarBaseSchema.patientId,
    id: calendarBaseSchema.id,
  })
  .meta({
    id: 'CalendarIdParam',
  });

export type CalendarIdParam = z.infer<typeof calendarIdParamSchema>;
