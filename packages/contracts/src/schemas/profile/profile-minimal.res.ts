import { z } from 'zod';
import { profileBaseSchema } from '../../base/profile.base-schema';

export const profileMinimalResSchema = z
  .object({
    id: profileBaseSchema.id,
    firstName: profileBaseSchema.firstName,
    lastName: profileBaseSchema.lastName,
  })
  .meta({
    id: 'ProfileMinimalRes',
  });

export type ProfileMinimalRes = z.infer<typeof profileMinimalResSchema>;
