import { z } from 'zod';
import { calendarBaseSchema } from '../../base/calendar.base-schema';

// /patients/:patientId/calendars
export const calendarPatientParamsSchema = z
  .object({
    patientId: calendarBaseSchema.patientId,
  })
  .meta({
    id: 'CalendarPatientParams',
  });

export type CalendarPatientParams = z.infer<typeof calendarPatientParamsSchema>;
