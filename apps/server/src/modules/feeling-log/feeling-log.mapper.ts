import type { FeelingLogRes } from '@base-monorepo-v2/contracts/schemas/feeling-log/feeling-log.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';

export class FeelingLogMapper {
  static toRes = (feelingLog: Prisma.FeelingLogGetPayload<{}>): FeelingLogRes => ({
    id: feelingLog.id,
    patientId: feelingLog.patientId,
    energyLevel: feelingLog.energyLevel,
    fatigueLevel: feelingLog.fatigueLevel,
    mentalClarity: feelingLog.mentalClarity,
    moodLevel: feelingLog.moodLevel,
    physicalComfort: feelingLog.physicalComfort,
    symptoms: feelingLog.symptoms,
    symptomPattern: feelingLog.symptomPattern,
    symptomOnset: feelingLog.symptomOnset,
    symptomStartedAt: feelingLog.symptomStartedAt?.toISOString() ?? null,
    createdAt: feelingLog.createdAt.toISOString(),
    updatedAt: feelingLog.updatedAt.toISOString(),
  });
}
