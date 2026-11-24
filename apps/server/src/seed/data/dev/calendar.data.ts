import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { CalendarType } from '@base-monorepo-v2/db/prisma/enums';
import { genUuid } from '../../helper/generateUuid';
import { patientSeedData } from './actors';

// ─── Calendar ─────────────────────────────────────────────────────────────────

const calendarSeedData = {
  // patient1
  calendar1: {
    id: genUuid('calendar1'),
    patientId: patientSeedData.patient1.id,
    title: 'Oncology consultation',
    description: 'Review latest scan results and treatment plan.',
    type: CalendarType.DOCTOR_APPOINTMENT,
    doctorName: 'Dr. Sarah Wilson',
    clinicName: 'City Cancer Center',
    startDate: '2026-12-02T09:00:00.000Z',
    endDate: '2026-12-02T09:45:00.000Z',
  },
  calendar2: {
    id: genUuid('calendar2'),
    patientId: patientSeedData.patient1.id,
    title: 'Chemotherapy session #4',
    description: 'Bring a snack and a book, session lasts around 4 hours.',
    type: CalendarType.CHEMOTHERAPY,
    doctorName: null,
    clinicName: 'City Cancer Center - Infusion Unit',
    startDate: '2026-12-05T08:30:00.000Z',
    endDate: '2026-12-05T12:30:00.000Z',
  },
  calendar3: {
    id: genUuid('calendar3'),
    patientId: patientSeedData.patient1.id,
    title: 'Blood test',
    description: 'Fasting required from midnight.',
    type: CalendarType.CHECKUP,
    doctorName: null,
    clinicName: 'Downtown Medical Lab',
    startDate: '2026-12-09T07:30:00.000Z',
    endDate: '2026-12-09T08:00:00.000Z',
  },
  calendar4: {
    id: genUuid('calendar4'),
    patientId: patientSeedData.patient1.id,
    title: 'Chemotherapy session #5',
    description: null,
    type: CalendarType.CHEMOTHERAPY,
    doctorName: null,
    clinicName: 'City Cancer Center - Infusion Unit',
    startDate: '2026-12-19T08:30:00.000Z',
    endDate: '2026-12-19T12:30:00.000Z',
  },
  calendar5: {
    id: genUuid('calendar5'),
    patientId: patientSeedData.patient1.id,
    title: 'Follow-up with oncologist',
    description: 'Discuss side effects after session #5.',
    type: CalendarType.DOCTOR_APPOINTMENT,
    doctorName: 'Dr. Sarah Wilson',
    clinicName: 'City Cancer Center',
    startDate: '2026-12-23T14:00:00.000Z',
    endDate: '2026-12-23T14:30:00.000Z',
  },
} as const satisfies Record<string, Prisma.CalendarUncheckedCreateInput>;

export { calendarSeedData };
