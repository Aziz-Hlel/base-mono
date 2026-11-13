import { z } from 'zod';
import { profileBaseSchema } from '../../base/profile.base-schema';

export const createProfileReqSchema = z
  .object({
    firstName: profileBaseSchema.firstName,
    lastName: profileBaseSchema.lastName,
    gender: profileBaseSchema.gender,
    phone: profileBaseSchema.phone,
    birthday: profileBaseSchema.birthday,
    role: profileBaseSchema.role,
  })
  .meta({
    id: 'CreateProfileReq',
  });

export type CreateProfileReq = z.infer<typeof createProfileReqSchema>;
