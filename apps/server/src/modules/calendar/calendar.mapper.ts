import type { CalendarRes } from '@base-monorepo-v2/contracts/schemas/calendar/calendar.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';

export class CalendarMapper {
  static toRes = (calendar: Prisma.CalendarGetPayload<{}>): CalendarRes => ({
    id: calendar.id,
    title: calendar.title,
    description: calendar.description,
    type: calendar.type,
    doctorName: calendar.doctorName,
    clinicName: calendar.clinicName,
    startDate: calendar.startDate.toISOString(),
    endDate: calendar.endDate?.toISOString() ?? null,
  });
}
