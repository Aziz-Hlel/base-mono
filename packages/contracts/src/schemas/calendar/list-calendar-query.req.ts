import { z } from 'zod';

// /patients/:patientId/calendars?startDate=...&endDate=...
// Missing startDate → start of today, missing endDate → end of the startDate day
export const listCalendarQuerySchema = z
  .object({
    startDate: z.iso.datetime().optional(),
    endDate: z.iso.datetime().optional(),
  })
  .refine(
    ({ startDate, endDate }) => !startDate || !endDate || new Date(endDate) >= new Date(startDate),
    { message: 'endDate must be after startDate', path: ['endDate'] },
  )
  .meta({
    id: 'ListCalendarQuery',
  });

export type ListCalendarQuery = z.infer<typeof listCalendarQuerySchema>;
