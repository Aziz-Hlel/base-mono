import { z } from 'zod';
import { calendarResSchema } from './calendar.res';

export const listCalendarResSchema = z.array(calendarResSchema).meta({
  id: 'ListCalendarRes',
  description: 'Calendar events within the requested interval, ordered by start date',
});

export type ListCalendarRes = z.infer<typeof listCalendarResSchema>;
