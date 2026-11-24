import prisma from '@/db';
import { calendarSeedData } from '../data/dev/calendar.data';

class CalendarSeedService {
  public async seed() {
    const data = Object.values(calendarSeedData);

    await prisma.calendar.createMany({ data, skipDuplicates: true });
  }
}

export const calendarSeedService = new CalendarSeedService();
