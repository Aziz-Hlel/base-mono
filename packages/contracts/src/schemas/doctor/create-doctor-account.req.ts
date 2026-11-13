import { z } from 'zod';
import { createProfileReqSchema } from '../profile/create-profile.req';
import { createUserReqSchema } from '../user/create-user.req';
import { createDoctorReqSchema } from './create-doctor.req';

export const createDoctorAccountReqSchema = z
  .object({
    user: createUserReqSchema,
    profile: createProfileReqSchema,
    doctor: createDoctorReqSchema,
  })
  .meta({
    id: 'CreateDoctorAccountReq',
    description: 'Creates a user, its profile and its doctor record in one request',
  });

export type CreateDoctorAccountReq = z.infer<typeof createDoctorAccountReqSchema>;
