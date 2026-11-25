import type { MeRes } from '@base-monorepo-v2/contracts/schemas/auth/me.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { ProfileMapper } from '../profile/profile.mapper';
import { UserMapper } from '../users/user.mapper';

export const meInclude = {
  profile: {
    include: {
      avatar: true,
      doctor: true,
      patient: true,
      guardian: true,
    },
  },
} as const satisfies Prisma.UserInclude;

type MeUser = Prisma.UserGetPayload<{ include: typeof meInclude }>;

export class MeMapper {
  static toRes = (user: MeUser): MeRes => {
    const userRes = UserMapper.toRes(user);
    const { profile } = user;

    if (!profile) return { user: userRes, profile: null, profileRole: null };

    const profileRes = ProfileMapper.toRes(profile);
    const base = { user: userRes, profile: profileRes };

    // Fall back to the null variant if the role row doesn't exist yet.
    if (profile.role === 'DOCTOR' && profile.doctor) {
      const { doctor } = profile;
      return {
        ...base,
        profileRole: 'DOCTOR',
        doctor: {
          id: doctor.id,
          titleEn: doctor.titleEn,
          titleAr: doctor.titleAr,
          bioEn: doctor.bioEn,
          bioAr: doctor.bioAr,
          specialty: doctor.specialty,
          subSpecialties: doctor.subSpecialties,
          cancerFocus: doctor.cancerFocus,
          practiceStartYear: doctor.practiceStartYear,
          licenseNumber: doctor.licenseNumber,
          createdAt: doctor.createdAt.toISOString(),
          updatedAt: doctor.updatedAt.toISOString(),
        },
      };
    }

    if (profile.role === 'PATIENT' && profile.patient) {
      const { patient } = profile;
      return {
        ...base,
        profileRole: 'PATIENT',
        patient: {
          id: patient.id,
          cancerType: patient.cancerType,
          cancerSubtype: patient.cancerSubtype,
          cancerStage: patient.cancerStage,
          journeyStage: patient.journeyStage,
          allergies: patient.allergies,
          dietaryRestrictions: patient.dietaryRestrictions,
          activityLevel: patient.activityLevel,
          createdAt: patient.createdAt.toISOString(),
          updatedAt: patient.updatedAt.toISOString(),
        },
      };
    }

    if (profile.role === 'GUARDIAN' && profile.guardian) {
      const { guardian } = profile;
      return {
        ...base,
        profileRole: 'GUARDIAN',
        guardian: {
          id: guardian.id,
          createdAt: guardian.createdAt.toISOString(),
          updatedAt: guardian.updatedAt.toISOString(),
        },
      };
    }

    return { ...base, profileRole: null };
  };
}
