import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import { Prisma } from '@base-monorepo-v2/db/prisma';
import { z, ZodError } from 'zod';
import { BadRequestException, InternalServerErrorException } from '..';
import { HttpException } from '../httpException';

const toHttpException = (err: unknown): HttpException => {
  if (err instanceof HttpException) return err;
  if (err instanceof ZodError)
    return new BadRequestException('Validation failed', {
      code: ERROR_CODES.GLOBAL.BAD_REQUEST,
      details: z.flattenError(err).fieldErrors,
      cause: err,
    });

  const isPrismaError =
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientKnownRequestError;

  if (isPrismaError)
    return new InternalServerErrorException('Unexpected database error occurred', {
      cause: err,
    });

  return new InternalServerErrorException('Internal server error', { cause: err });
};

export default toHttpException;
