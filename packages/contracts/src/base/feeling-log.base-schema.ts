import z from 'zod';
import feelingSymptomSchema from './enums/feeling-symptom.schema';
import symptomOnsetSchema from './enums/symptom-onset.schema';
import symptomPatternSchema from './enums/symptom-pattern.schema';

const comfortScore = (field: string) =>
  z
    .int(`${field} must be an integer`)
    .min(1, `${field} must be at least 1`)
    .max(10, `${field} must be at most 10`);

export const feelingLogBaseSchema = {
  id: z.uuid(),
  patientId: z.uuid(),
  energyLevel: comfortScore('Energy level'),
  fatigueLevel: comfortScore('Fatigue level'),
  mentalClarity: comfortScore('Mental clarity'),
  moodLevel: comfortScore('Mood level'),
  physicalComfort: comfortScore('Physical comfort'),
  symptoms: z.array(feelingSymptomSchema),
  symptomPattern: symptomPatternSchema.nullable(),
  symptomOnset: symptomOnsetSchema,
  symptomStartedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
