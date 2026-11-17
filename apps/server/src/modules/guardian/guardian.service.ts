import prisma from '@/db';
import { ConflictException, ForbiddenException, NotFoundException } from '@/exceptions';
import { PageMapper } from '@/mapper/page.mapper';
import { passwordService } from '@/modules/auth/password.service';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { GuardianQueryParamsTypes } from '@base-monorepo-v2/contracts/schemas/guardian/get-guardians-query-params.req';
import type { RequestGuardianPatientLinkReq } from '@base-monorepo-v2/contracts/schemas/guardian/request-guardian-patient-link.req';
import type { UpdateGuardianPatientReq } from '@base-monorepo-v2/contracts/schemas/guardian/update-guardian-patient.req';
import type { UpdateGuardianReq } from '@base-monorepo-v2/contracts/schemas/guardian/update-guardian.req';
import {
  GuardianLinkStatus,
  ProfileRole,
  UserRole,
  type Prisma,
} from '@base-monorepo-v2/db/prisma';
import { GuardianMapper } from './guardian.mapper';

class GuardianService {
  listAll = async (query: GuardianQueryParamsTypes['Query']) => {
    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.GuardianWhereInput = {};

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

    const orderBy: Prisma.GuardianOrderByWithRelationInput = {};

    if (query.sortBy === 'createdAt') {
      orderBy[query.sortBy] = query.order;
    }

    const [content, totalElements] = await Promise.all([
      prisma.guardian.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          profile: { include: { user: true, avatar: true } },
          guardianPatient: {
            include: {
              patient: {
                include: {
                  profile: { include: { user: true, avatar: true } },
                },
              },
            },
          },
        },
      }),
      prisma.guardian.count({ where }),
    ]);

    const data = content.map(GuardianMapper.toMinimalRes);

    const pageResponse = PageMapper.toPageRes({
      query,
      totalElements,
      data,
    });

    return pageResponse;
  };

  getById = async (id: string) => {
    const guardian = await prisma.guardian.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            user: true,
            avatar: true,
          },
        },
        guardianPatient: {
          include: {
            patient: {
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

    if (!guardian) {
      throw new NotFoundException(`Guardian with id ${id} not found`);
    }

    return GuardianMapper.toRes(guardian);
  };

  create = async (profileId: string) => {
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: { guardian: true, user: { select: { role: true } } },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found for this user', {
        code: ERROR_CODES.PROFILE.NOT_FOUND,
      });
    }

    if (profile.user.role !== UserRole.USER) {
      throw new ForbiddenException('User has administrative role and cannot be a guardian');
    }

    if (profile.role === ProfileRole.GUARDIAN) {
      throw new ConflictException('Guardian role already exists for this user', {
        code: ERROR_CODES.GUARDIAN.ALREADY_EXISTS,
      });
    }

    if (profile.role) {
      throw new ConflictException('Guardian role already exists for this user', {
        code: ERROR_CODES.GUARDIAN.ALREADY_EXISTS,
      });
    }

    const createGuardianQuery = prisma.guardian.create({
      data: {
        id: profileId,
      },
    });

    const updateProfileRoleQuery = prisma.profile.update({
      where: { id: profileId },
      data: {
        role: ProfileRole.GUARDIAN,
      },
    });

    await Promise.all([createGuardianQuery, updateProfileRoleQuery]);

    return this.getById(profileId);
  };

  update = async (id: string, data: UpdateGuardianReq) => {
    const existing = await prisma.guardian.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Guardian with id ${id} not found`);
    }

    const hashedPassword = await passwordService.hashPassword(data.user.password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: {
          username: data.user.username,
          password: hashedPassword,
        },
      }),
      prisma.profile.update({
        where: { id },
        data: {
          firstName: data.profile.firstName,
          lastName: data.profile.lastName,
          gender: data.profile.gender,
          phone: data.profile.phone,
          birthday: data.profile.birthday,
        },
      }),
      prisma.guardian.update({
        where: { id },
        data: {},
      }),
    ]);

    return this.getById(id);
  };

  updateGuardianPatient = async (
    guardianId: string,
    patientId: string,
    data: UpdateGuardianPatientReq,
  ) => {
    const existing = await prisma.guardianPatient.findUnique({
      where: {
        guardianId_patientId: {
          guardianId,
          patientId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException(
        `Guardian-patient relation for guardian ${guardianId} and patient ${patientId} not found`,
      );
    }

    const updated = await prisma.guardianPatient.update({
      where: {
        guardianId_patientId: {
          guardianId,
          patientId,
        },
      },
      data,
    });

    return GuardianMapper.toGuardianPatientRes(updated);
  };

  requestPatientLink = async (guardianId: string, data: RequestGuardianPatientLinkReq) => {
    const patientUser = await prisma.user.findUnique({
      where: { email: data.email },
      include: { profile: { include: { patient: true } } },
    });

    const patient = patientUser?.profile?.patient;

    if (!patient) {
      throw new NotFoundException(`No patient found with email ${data.email}`, {
        code: ERROR_CODES.PATIENT.NOT_FOUND,
      });
    }

    const guardian = await prisma.guardian.findUnique({
      where: { id: guardianId },
      include: {
        guardianPatient: {
          where: {
            patientId: patient.id,
          },
        },
      },
    });

    if (!guardian) {
      throw new NotFoundException('Guardian not found for this user', {
        code: ERROR_CODES.GUARDIAN.NOT_FOUND,
      });
    }

    const existingLink = guardian.guardianPatient[0];

    if (existingLink && existingLink.linkStatus === GuardianLinkStatus.ACCEPTED) {
      throw new ConflictException('Guardian is already linked with this patient', {
        code: ERROR_CODES.GUARDIAN_PATIENT.ALREADY_LINKED,
      });
    }

    if (existingLink && existingLink.linkStatus === GuardianLinkStatus.PENDING) {
      throw new ConflictException('A link request with this patient already exists', {
        code: ERROR_CODES.GUARDIAN_PATIENT.PENDING_ALREADY_EXISTS,
      });
    }

    if (existingLink && existingLink.linkStatus === GuardianLinkStatus.REVOKED) {
      const link = await prisma.guardianPatient.update({
        where: { id: existingLink.id },
        data: {
          patientId: patient.id,
          linkStatus: GuardianLinkStatus.PENDING,
        },
      });

      return GuardianMapper.toGuardianPatientRes(link);
    }

    const link = await prisma.guardianPatient.create({
      data: {
        guardianId,
        patientId: patient.id,
        linkStatus: GuardianLinkStatus.PENDING,
      },
    });

    return GuardianMapper.toGuardianPatientRes(link);
  };
}

export const guardianService = new GuardianService();
