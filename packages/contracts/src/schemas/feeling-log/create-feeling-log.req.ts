import { z } from 'zod';
import { feelingLogBaseSchema } from '../../base/feeling-log.base-schema';

export const createFeelingLogReqSchema = z
  .object({
    energyLevel: feelingLogBaseSchema.energyLevel,
    fatigueLevel: feelingLogBaseSchema.fatigueLevel,
    mentalClarity: feelingLogBaseSchema.mentalClarity,
    moodLevel: feelingLogBaseSchema.moodLevel,
    physicalComfort: feelingLogBaseSchema.physicalComfort,
    symptoms: feelingLogBaseSchema.symptoms,
    symptomPattern: feelingLogBaseSchema.symptomPattern,
    symptomOnset: feelingLogBaseSchema.symptomOnset,
    symptomStartedAt: feelingLogBaseSchema.symptomStartedAt,
  })

  .meta({
    id: 'CreateFeelingLogReq',
  });

export type CreateFeelingLogReq = z.infer<typeof createFeelingLogReqSchema>;
