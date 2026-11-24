import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { FeedStatus } from '@base-monorepo-v2/db/prisma/enums';
import { guardianshipSeedData, patientSeedData } from './actors';
import { diaryNotesSeedData } from './diary-notes.data';

const feedSeedData = {
  // patient1
  feed1: {
    id: diaryNotesSeedData.diaryNote1.id,
    status: FeedStatus.APPROVED,
    isPinned: true,
    journeyStage: patientSeedData.patient1.journeyStage,
    relationShip: null,
    approvedAt: '2026-11-04T10:00:00.000Z',
    createdAt: diaryNotesSeedData.diaryNote1.createdAt,
  },
  feed2: {
    id: diaryNotesSeedData.diaryNote2.id,
    status: FeedStatus.APPROVED,
    isPinned: false,
    journeyStage: patientSeedData.patient1.journeyStage,
    relationShip: null,
    approvedAt: '2026-11-06T10:00:00.000Z',
    createdAt: diaryNotesSeedData.diaryNote2.createdAt,
  },
  feed3: {
    id: diaryNotesSeedData.diaryNote3.id,
    status: FeedStatus.APPROVED,
    isPinned: false,
    journeyStage: patientSeedData.patient1.journeyStage,
    relationShip: null,
    approvedAt: '2026-11-11T10:00:00.000Z',
    createdAt: diaryNotesSeedData.diaryNote3.createdAt,
  },
  feed4: {
    id: diaryNotesSeedData.diaryNote4.id,
    status: FeedStatus.APPROVED,
    isPinned: false,
    journeyStage: patientSeedData.patient1.journeyStage,
    relationShip: null,
    approvedAt: '2026-11-17T10:00:00.000Z',
    createdAt: diaryNotesSeedData.diaryNote4.createdAt,
  },
  feed5: {
    id: diaryNotesSeedData.diaryNote5.id,
    status: FeedStatus.PENDING,
    isPinned: false,
    journeyStage: patientSeedData.patient1.journeyStage,
    relationShip: null,
    approvedAt: null,
    createdAt: diaryNotesSeedData.diaryNote5.createdAt,
  },
  // guardian1
  feed6: {
    id: diaryNotesSeedData.diaryNote6.id,
    status: FeedStatus.APPROVED,
    isPinned: true,
    journeyStage: patientSeedData.patient1.journeyStage,
    relationShip: guardianshipSeedData.guardianship1.relationship,
    approvedAt: '2026-11-06T10:00:00.000Z',
    createdAt: diaryNotesSeedData.diaryNote6.createdAt,
  },
  feed7: {
    id: diaryNotesSeedData.diaryNote7.id,
    status: FeedStatus.REJECTED,
    isPinned: false,
    journeyStage: patientSeedData.patient1.journeyStage,
    relationShip: guardianshipSeedData.guardianship1.relationship,
    approvedAt: null,
    createdAt: diaryNotesSeedData.diaryNote7.createdAt,
  },
} as const satisfies Record<string, Prisma.FeedUncheckedCreateInput>;

export { feedSeedData };
