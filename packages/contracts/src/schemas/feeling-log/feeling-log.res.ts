import { z } from 'zod';
import { feelingLogBaseSchema } from '../../base/feeling-log.base-schema';

export const feelingLogResSchema = z
  .object({
    id: feelingLogBaseSchema.id,
    patientId: feelingLogBaseSchema.patientId,
    energyLevel: feelingLogBaseSchema.energyLevel,
    fatigueLevel: feelingLogBaseSchema.fatigueLevel,
    mentalClarity: feelingLogBaseSchema.mentalClarity,
    moodLevel: feelingLogBaseSchema.moodLevel,
    physicalComfort: feelingLogBaseSchema.physicalComfort,
    symptoms: feelingLogBaseSchema.symptoms,
    symptomPattern: feelingLogBaseSchema.symptomPattern,
    symptomOnset: feelingLogBaseSchema.symptomOnset,
    symptomStartedAt: feelingLogBaseSchema.symptomStartedAt,
    createdAt: feelingLogBaseSchema.createdAt,
    updatedAt: feelingLogBaseSchema.updatedAt,
  })
  .meta({
    id: 'FeelingLogRes',
  });

export type FeelingLogRes = z.infer<typeof feelingLogResSchema>;
