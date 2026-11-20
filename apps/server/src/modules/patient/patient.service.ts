import prisma from '@/db';
import { ConflictException, ForbiddenException, NotFoundException } from '@/exceptions';
import { PageMapper } from '@/mapper/page.mapper';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { CreateFullPatientReq } from '@base-monorepo-v2/contracts/schemas/patient/create-full-patient.req';
import type { CreatePatientReq } from '@base-monorepo-v2/contracts/schemas/patient/create-patient.req';
import type { PatientQueryParamsTypes } from '@base-monorepo-v2/contracts/schemas/patient/get-patients-query-params.req';
import type { LinkGuardianPatientReq } from '@base-monorepo-v2/contracts/schemas/patient/link-guardian-patient.req';
import type { UpdatePatientReq } from '@base-monorepo-v2/contracts/schemas/patient/update-patient.req';
import {
  GuardianLinkStatus,
  ProfileRole,
  UserRole,
  type Prisma,
} from '@base-monorepo-v2/db/prisma';
import { authService } from '../auth/auth.service';
import { GuardianshipMapper } from '../guardianship/guardianship.mapper';
import { profileService } from '../profile/profile.service';
import { PatientMapper } from './patient.mapper';

class PatientService {
  listAll = async (query: PatientQueryParamsTypes['Query']) => {
    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.PatientWhereInput = {};

    if (query.search && query.search.trim().length > 0) {
      const searchValue = query.search.trim().toLowerCase();
      where.profile = {
        is: {
          OR: [
            { firstName: { contains: searchValue, mode: 'insensitive' } },
            { lastName: { contains: searchValue, mode: 'insensitive' } },
          ],
        },
      };
    }

    const orderBy: Prisma.PatientOrderByWithRelationInput = {};

    if (query.sortBy === 'createdAt' || query.sortBy === 'updatedAt') {
      orderBy[query.sortBy] = query.order;
    }

    const [content, totalElements] = await Promise.all([
      prisma.patient.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          profile: { include: { user: true, avatar: true } },
        },
      }),
      prisma.patient.count({ where }),
    ]);

    const data = content.map(PatientMapper.toMinimalRes);

    const pageResponse = PageMapper.toPageRes({
      query,
      totalElements,
      data,
    });

    return pageResponse;
  };

  getById = async (id: string) => {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            user: true,
            avatar: true,
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`, {
        code: ERROR_CODES.PATIENT.NOT_FOUND,
      });
    }

    return PatientMapper.toDetailedRes(patient);
  };

  createFull = async (data: CreateFullPatientReq) => {
    const user = await authService.register(data.user);

    await profileService.create(user.id, data.profile);

    return this.create(user.id, data.patient);
  };

  create = async (profileId: string, data: CreatePatientReq) => {
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: { patient: true, user: { select: { role: true } } },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found for this user', {
        code: ERROR_CODES.PROFILE.NOT_FOUND,
      });
    }

    if (profile.user.role !== UserRole.USER) {
      throw new ForbiddenException('User has administrative role and cannot be a patient');
    }

    if (profile.role === ProfileRole.PATIENT) {
      throw new ConflictException('Patient role already exists for this user', {
        code: ERROR_CODES.PATIENT.ALREADY_EXISTS,
      });
    }

    if (profile.role) {
      throw new ConflictException(`User already has the ${profile.role} role`, {
        code: ERROR_CODES.PROFILE.ALREADY_EXISTS,
      });
    }

    const createPatientQuery = prisma.patient.create({
      data: {
        id: profileId,
        cancerType: data.cancerType,
        cancerSubtype: data.cancerSubtype,
        cancerStage: data.cancerStage,
        journeyStage: data.journeyStage,
        allergies: data.allergies,
        dietaryRestrictions: data.dietaryRestrictions,
        activityLevel: data.activityLevel,
      },
    });

    const updateProfileRoleQuery = prisma.profile.update({
      where: { id: profileId },
      data: {
        role: ProfileRole.PATIENT,
      },
    });

    await prisma.$transaction([createPatientQuery, updateProfileRoleQuery]);

    return this.getById(profileId);
  };

  update = async (id: string, data: UpdatePatientReq) => {
    const existing = await prisma.patient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Patient with id ${id} not found`, {
        code: ERROR_CODES.PATIENT.NOT_FOUND,
      });
    }

    await prisma.patient.update({
      where: { id },
      data: {
        cancerType: data.cancerType,
        cancerSubtype: data.cancerSubtype,
        cancerStage: data.cancerStage,
        journeyStage: data.journeyStage,
        allergies: data.allergies,
        dietaryRestrictions: data.dietaryRestrictions,
        activityLevel: data.activityLevel,
      },
    });

    return this.getById(id);
  };

  listGuardians = async (patientId: string) => {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        guardianships: {
          include: {
            guardian: {
              include: {
                profile: {
                  include: {
                    user: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with id ${patientId} not found`, {
        code: ERROR_CODES.PATIENT.NOT_FOUND,
      });
    }

    return patient.guardianships.map(GuardianshipMapper.toPatientGuardianRes);
  };

  linkGuardian = async (patientId: string, data: LinkGuardianPatientReq) => {
    const patientQuery = prisma.patient.findUnique({ where: { id: patientId } });
    const guardianQuery = prisma.user.findUnique({
      where: { email: data.email },
      include: {
        profile: {
          include: {
            guardian: {
              include: {
                guardianships: { where: { patientId } },
              },
            },
          },
        },
      },
    });
    const [patient, guardianUser] = await Promise.all([patientQuery, guardianQuery]);

    if (!patient) {
      throw new NotFoundException(`Patient with id ${patientId} not found`, {
        code: ERROR_CODES.PATIENT.NOT_FOUND,
      });
    }

    const guardian = guardianUser?.profile?.guardian;

    if (!guardian) {
      throw new NotFoundException(`No guardian found with email ${data.email}`, {
        code: ERROR_CODES.GUARDIAN.NOT_FOUND,
      });
    }

    if (guardian.guardianships.length > 0) {
      throw new ConflictException(
        'A guardianship between this guardian and patient already exists',
        {
          code: ERROR_CODES.GUARDIANSHIP.ALREADY_EXISTS,
        },
      );
    }

    const guardianship = await prisma.guardianship.create({
      data: {
        guardianId: guardian.id,
        patientId,
        linkStatus: GuardianLinkStatus.ACCEPTED,
      },
    });

    return GuardianshipMapper.toRes(guardianship);
  };
}

export const patientService = new PatientService();
