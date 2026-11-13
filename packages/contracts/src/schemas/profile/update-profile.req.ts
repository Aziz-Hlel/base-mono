import type { z } from 'zod';
import { createProfileReqSchema } from './create-profile.req';

export const updateProfileReqSchema = createProfileReqSchema.meta({
  id: 'UpdateProfileReq',
});

export type UpdateProfileReq = z.infer<typeof updateProfileReqSchema>;
