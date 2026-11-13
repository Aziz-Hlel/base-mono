import z from 'zod';
import activityLevelSchema from './enums/activity-level.schema';
import cancerStageSchema from './enums/cancer-stage.schema';
import cancerTypeSchema from './enums/cancer-type.schema';
import dietaryRestrictionSchema from './enums/dietary-restriction.schema';
import journeyStageSchema from './enums/journey-stage.schema';
import { zodNullableString, zodString } from './shared/string.zod';

export const patientBaseSchema = {
  id: z.uuid(),
  cancerType: cancerTypeSchema.nullable(),
  cancerSubtype: zodNullableString('Cancer subtype'),
  cancerStage: cancerStageSchema.nullable(),
  journeyStage: journeyStageSchema,
  allergies: z.array(zodString('Allergy')),
  dietaryRestrictions: z.array(dietaryRestrictionSchema),
  activityLevel: activityLevelSchema.nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
