import prisma from '@/db';
import { ForbiddenException, NotFoundException } from '@/exceptions';
import { CursorMapper } from '@/mapper/cursor.mapper';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { CreateFeelingLogReq } from '@base-monorepo-v2/contracts/schemas/feeling-log/create-feeling-log.req';
import type { UpdateFeelingLogReq } from '@base-monorepo-v2/contracts/schemas/feeling-log/update-feeling-log.req';
import type { CursorQueryParams } from '@base-monorepo-v2/contracts/types/Cursor';
import { SymptomOnset, type Prisma } from '@base-monorepo-v2/db/prisma';
import { FeelingLogMapper } from './feeling-log.mapper';

class FeelingLogService {
  listByCursor = async (patientId: string, query: CursorQueryParams) => {
    const where: Prisma.FeelingLogWhereInput = {
      patientId,
    };

    const queryResponse = await prisma.feelingLog.findMany({
      where,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: [{ createdAt: 'desc' }],
      take: query.limit + 1,
    });

    const lastItem = queryResponse[query.limit];

    const nextCursor = lastItem?.id ?? null;

    const data = queryResponse.slice(0, query.limit).map(FeelingLogMapper.toRes);

    return CursorMapper.toCursor({
      data,
      nextCursor,
      limit: query.limit,
    });
  };

  getById = async (id: string) => {
    const feelingLog = await prisma.feelingLog.findUnique({
      where: { id },
    });

    if (!feelingLog) {
      throw new NotFoundException(`Feeling log with id ${id} not found`, {
        code: ERROR_CODES.FEELING_LOG.NOT_FOUND,
      });
    }

    return FeelingLogMapper.toRes(feelingLog);
  };

  create = async (patientId: string, data: CreateFeelingLogReq) => {
    const feelingLog = await prisma.feelingLog.create({
      data: {
        patientId,
        energyLevel: data.energyLevel,
        fatigueLevel: data.fatigueLevel,
        mentalClarity: data.mentalClarity,
        moodLevel: data.moodLevel,
        physicalComfort: data.physicalComfort,
        symptoms: data.symptoms,
        symptomPattern: data.symptomPattern,
        symptomOnset: data.symptomOnset,
        symptomStartedAt: this.resolveSymptomStartedAt(data.symptomOnset, data.symptomStartedAt),
      },
    });

    return FeelingLogMapper.toRes(feelingLog);
  };

  update = async (id: string, patientId: string, data: UpdateFeelingLogReq) => {
    const existing = await prisma.feelingLog.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Feeling log with id ${id} not found`, {
        code: ERROR_CODES.FEELING_LOG.NOT_FOUND,
      });
    }

    if (existing.patientId !== patientId) {
      throw new ForbiddenException('You can only update your own feeling logs');
    }

    const feelingLog = await prisma.feelingLog.update({
      where: { id },
      data: {
        energyLevel: data.energyLevel,
        fatigueLevel: data.fatigueLevel,
        mentalClarity: data.mentalClarity,
        moodLevel: data.moodLevel,
        physicalComfort: data.physicalComfort,
        symptoms: data.symptoms,
        symptomPattern: data.symptomPattern,
        symptomOnset: data.symptomOnset,
        symptomStartedAt: this.resolveSymptomStartedAt(data.symptomOnset, data.symptomStartedAt),
      },
    });

    return FeelingLogMapper.toRes(feelingLog);
  };

  private resolveSymptomStartedAt = (
    symptomOnset: SymptomOnset,
    symptomStartedAt: string | null,
  ): Date | null => {
    if (symptomOnset) return null;
    return symptomStartedAt ? new Date(symptomStartedAt) : null;
  };
}

export const feelingLogService = new FeelingLogService();
