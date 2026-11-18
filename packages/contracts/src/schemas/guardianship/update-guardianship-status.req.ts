import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const updateGuardianshipStatusReqSchema = z
  .object({
    linkStatus: guardianshipBaseSchema.linkStatus,
  })
  .meta({
    id: 'UpdateGuardianshipStatusReq',
  });

export type UpdateGuardianshipStatusReq = z.infer<typeof updateGuardianshipStatusReqSchema>;
