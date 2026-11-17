import z from 'zod';
import { updateProfileReqSchema } from '../profile/update-profile.req';
import { updateUserReqSchema } from '../user/update-user.req';

export const updateGuardianReqSchema = z
  .object({
    profile: updateProfileReqSchema,
    user: updateUserReqSchema,
  })
  .meta({
    id: 'UpdateGuardianReq',
  });

export type UpdateGuardianReq = z.infer<typeof updateGuardianReqSchema>;
