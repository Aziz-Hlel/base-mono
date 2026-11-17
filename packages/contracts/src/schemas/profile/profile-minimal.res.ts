import { z } from 'zod';
import { profileBaseSchema } from '../../base/profile.base-schema';
import { mediaResponseSchema } from '../media/media.res';

export const profileMinimalResSchema = z
  .object({
    id: profileBaseSchema.id,
    firstName: profileBaseSchema.firstName,
    lastName: profileBaseSchema.lastName,
    avatar: mediaResponseSchema.nullable(),
  })
  .meta({
    id: 'ProfileMinimalRes',
  });

export type ProfileMinimalRes = z.infer<typeof profileMinimalResSchema>;
