import { z } from 'zod';
import { profileBaseSchema } from '../../base/profile.base-schema';

export const profileResSchema = z
  .object({
    id: profileBaseSchema.id,
    firstName: profileBaseSchema.firstName,
    lastName: profileBaseSchema.lastName,
    gender: profileBaseSchema.gender,
    phone: profileBaseSchema.phone,
    birthday: profileBaseSchema.birthday,
    role: profileBaseSchema.role,
    createdAt: profileBaseSchema.createdAt,
    updatedAt: profileBaseSchema.updatedAt,
  })
  .meta({
    id: 'ProfileRes',
  });

export type ProfileRes = z.infer<typeof profileResSchema>;
