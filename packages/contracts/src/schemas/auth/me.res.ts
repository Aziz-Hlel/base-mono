import { z } from 'zod';
import { doctorResSchema } from '../doctor/doctor.res';
import { guardianResSchema } from '../guardian/guardian.res';
import { patientResSchema } from '../patient/patient.res';
import { profileResSchema } from '../profile/profile.res';
import { userResSchema } from '../user/user.res';

/** Guardian data without `user`/`profile` (already at the root of MeRes) or `patients`. */
export const meGuardianResSchema = guardianResSchema
  .omit({ user: true, profile: true, patients: true })
  .meta({ id: 'MeGuardianRes' });

const meBase = {
  user: userResSchema,
  profile: profileResSchema,
};

export const meDoctorResSchema = z
  .object({
    ...meBase,
    profileRole: z.literal('DOCTOR'),
    doctor: doctorResSchema,
  })
  .meta({ id: 'MeDoctorRes' });

export const mePatientResSchema = z
  .object({
    ...meBase,
    profileRole: z.literal('PATIENT'),
    patient: patientResSchema,
  })
  .meta({ id: 'MePatientRes' });

export const meGuardianRoleResSchema = z
  .object({
    ...meBase,
    profileRole: z.literal('GUARDIAN'),
    guardian: meGuardianResSchema,
  })
  .meta({ id: 'MeGuardianRoleRes' });

/** No role-specific data yet: no profile (onboarding/admin), no profile role, or a missing role row. */
export const meNoRoleResSchema = z
  .object({
    user: userResSchema,
    profile: profileResSchema.nullable(),
    profileRole: z.null(),
  })
  .meta({ id: 'MeNoRoleRes' });

/**
 * Response for GET /api/auth/me.
 * Narrow on the root `profileRole` to get the matching `doctor` | `patient` | `guardian` object.
 */
export const meResSchema = z
  .discriminatedUnion('profileRole', [
    meDoctorResSchema,
    mePatientResSchema,
    meGuardianRoleResSchema,
    meNoRoleResSchema,
  ])
  .meta({
    id: 'MeRes',
    description: 'Current authenticated user with profile and role-specific data',
  });

export type MeGuardianRes = z.infer<typeof meGuardianResSchema>;
export type MeRes = z.infer<typeof meResSchema>;
