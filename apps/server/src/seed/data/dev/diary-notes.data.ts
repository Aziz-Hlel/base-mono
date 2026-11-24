import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { genUuid } from '../../helper/generateUuid';
import { profileSeedData } from './actors';

// ─── Diary Notes ──────────────────────────────────────────────────────────────

const diaryNotesSeedData = {
  // patient1
  diaryNote1: {
    id: genUuid('diaryNote1'),
    profileId: profileSeedData.patient1.id,
    title: 'First day of treatment',
    text: 'Felt nervous walking in, but the nurses were kind and explained everything. Tired in the evening.',
    createdAt: '2026-11-03T19:30:00.000Z',
  },
  diaryNote2: {
    id: genUuid('diaryNote2'),
    profileId: profileSeedData.patient1.id,
    title: 'A rough night',
    text: 'Nausea kept me up most of the night. The medication helped a bit after 2am.',
    createdAt: '2026-11-05T08:15:00.000Z',
  },
  diaryNote3: {
    id: genUuid('diaryNote3'),
    profileId: profileSeedData.patient1.id,
    title: 'Short walk outside',
    text: 'Managed a 20 minute walk in the park today. Fresh air made a big difference to my mood.',
    createdAt: '2026-11-10T17:00:00.000Z',
  },
  diaryNote4: {
    id: genUuid('diaryNote4'),
    profileId: profileSeedData.patient1.id,
    title: 'Questions for my doctor',
    text: 'Write down: tingling in fingers, trouble sleeping, can I keep drinking green tea?',
    createdAt: '2026-11-16T21:45:00.000Z',
  },
  diaryNote5: {
    id: genUuid('diaryNote5'),
    profileId: profileSeedData.patient1.id,
    title: 'Good news',
    text: 'Blood results came back better than expected. Celebrated with a family dinner.',
    createdAt: '2026-11-21T20:10:00.000Z',
  },
  // guardian1
  diaryNote6: {
    id: genUuid('diaryNote6'),
    profileId: profileSeedData.guardian1.id,
    title: 'Supporting Alice this week',
    text: 'Drove her to the infusion unit and stayed for the whole session. She was brave as always.',
    createdAt: '2026-11-05T13:00:00.000Z',
  },
  diaryNote7: {
    id: genUuid('diaryNote7'),
    profileId: profileSeedData.guardian1.id,
    title: 'Taking care of myself too',
    text: 'Joined a caregiver support group online. Helpful to hear from people going through the same thing.',
    createdAt: '2026-11-18T22:00:00.000Z',
  },
} as const satisfies Record<string, Prisma.DiaryNotesUncheckedCreateInput>;

export { diaryNotesSeedData };
