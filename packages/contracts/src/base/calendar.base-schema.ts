import z from 'zod';
import calendarTypeSchema from './enums/calendar-type.schema';
import { zodNullableString, zodString } from './shared/string.zod';

export const calendarBaseSchema = {
  id: z.uuid(),
  title: zodString('Title'),
  description: zodNullableString('Description', { min: 1, max: 5000 }),
  type: calendarTypeSchema,
  doctorName: zodNullableString('Doctor name'),
  clinicName: zodNullableString('Clinic name'),
  patientId: z.uuid(),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime().nullable(),
};
