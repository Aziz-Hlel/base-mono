import { CalendarType } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const calendarTypeSchema = z.enum(CalendarType).meta({
  id: 'CalendarType',
  description: 'CalendarType enum',
});

export default calendarTypeSchema;
