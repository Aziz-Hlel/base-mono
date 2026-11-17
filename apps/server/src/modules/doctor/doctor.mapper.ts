import type { DoctorDetailedRes } from '@base-monorepo-v2/contracts/schemas/doctor/doctor-detailed.res';
import type { DoctorMinimalRes } from '@base-monorepo-v2/contracts/schemas/doctor/doctor-minimal.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { ProfileMapper } from '../profile/profile.mapper';
import { UserMapper } from '../users/user.mapper';

export class DoctorMapper {
  static toDetailedRes = (
    doctor: Prisma.DoctorGetPayload<{
      include: {
        profile: {
          include: {
            user: true;
            avatar: true;
          };
        };
      };
    }>,
  ): DoctorDetailedRes => {
    return {
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
      user: UserMapper.toRes(doctor.profile.user),
      profile: ProfileMapper.toRes(doctor.profile),
    };
  };

  static toMinimalRes = (
    doctor: Prisma.DoctorGetPayload<{
      include: {
        profile: {
          include: {
            user: true;
            avatar: true;
          };
        };
      };
    }>,
  ): DoctorMinimalRes => {
    return {
      id: doctor.id,
      titleEn: doctor.titleEn,
      titleAr: doctor.titleAr,
      specialty: doctor.specialty,
      user: UserMapper.toMinimalRes(doctor.profile.user),
      profile: ProfileMapper.toMinimalRes(doctor.profile),
    };
  };
}
