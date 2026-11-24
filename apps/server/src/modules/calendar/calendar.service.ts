import prisma from '@/db';
import { NotFoundException } from '@/exceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { CreateCalendarReq } from '@base-monorepo-v2/contracts/schemas/calendar/create-calendar.req';
import type { ListCalendarQuery } from '@base-monorepo-v2/contracts/schemas/calendar/list-calendar-query.req';
import type { UpdateCalendarReq } from '@base-monorepo-v2/contracts/schemas/calendar/update-calendar.req';
import { CalendarMapper } from './calendar.mapper';

class CalendarService {
  list = async (patientId: string, query: ListCalendarQuery) => {
    const from = query.startDate ? new Date(query.startDate) : this.startOfDay(new Date());
    const to = query.endDate ? new Date(query.endDate) : this.endOfDay(from);

    const calendars = await prisma.calendar.findMany({
      where: {
        patientId,
        startDate: { gte: from, lte: to },
        endDate: { gte: from, lte: to },
      },
      orderBy: [{ startDate: 'asc' }],
    });

    return calendars.map(CalendarMapper.toRes);
  };

  getById = async (id: string, patientId: string) => {
    const calendar = await this.findOrThrow(id, patientId);

    return CalendarMapper.toRes(calendar);
  };

  create = async (patientId: string, data: CreateCalendarReq) => {
    const calendar = await prisma.calendar.create({
      data: {
        patientId,
        title: data.title,
        description: data.description,
        type: data.type,
        doctorName: data.doctorName,
        clinicName: data.clinicName,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return CalendarMapper.toRes(calendar);
  };

  update = async (id: string, patientId: string, data: UpdateCalendarReq) => {
    await this.findOrThrow(id, patientId);

    const calendar = await prisma.calendar.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        doctorName: data.doctorName,
        clinicName: data.clinicName,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return CalendarMapper.toRes(calendar);
  };

  private findOrThrow = async (id: string, patientId: string) => {
    const calendar = await prisma.calendar.findFirst({
      where: { id, patientId },
    });

    if (!calendar) {
      throw new NotFoundException(`Calendar event with id ${id} not found`, {
        code: ERROR_CODES.CALENDAR.NOT_FOUND,
      });
    }

    return calendar;
  };

  private startOfDay = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  private endOfDay = (date: Date) => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  };
}

export const calendarService = new CalendarService();
