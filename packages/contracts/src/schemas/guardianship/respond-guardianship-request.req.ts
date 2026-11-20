import { GuardianLinkStatus } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const respondGuardianshipRequestReqSchema = z
  .object({
    linkStatus: guardianshipBaseSchema.linkStatus.extract([
      GuardianLinkStatus.ACCEPTED,
      GuardianLinkStatus.REVOKED,
      GuardianLinkStatus.PENDING,
    ]),
  })
  .meta({
    id: 'RespondGuardianshipRequestReq',
  });

export type RespondGuardianshipRequestReq = z.infer<typeof respondGuardianshipRequestReqSchema>;
