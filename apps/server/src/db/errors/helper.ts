import { Prisma } from '@excellense/db/prisma';
import PrismaExceptionCodes from './codes';

export const isUniqueViolationOn = (error: unknown, fields: string[]): boolean => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return false;
  if (error.code !== PrismaExceptionCodes.UNIQUE_CONSTRAINT) return false;

  const meta = error.meta as any;
  const raw: unknown = meta?.target ?? meta?.driverAdapterError?.cause?.constraint?.fields ?? [];

  const violated = (Array.isArray(raw) ? raw : [raw]).map((f) => String(f).replace(/"/g, ''));
  return fields.length === violated.length && fields.every((f) => violated.includes(f));
};
