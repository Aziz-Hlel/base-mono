import z from 'zod';
import genderSchema from './enums/gender.schema';
import profileRoleSchema from './enums/profile-role.schema';
import { zodNullableString, zodString } from './shared/string.zod';

export const profileBaseSchema = {
  id: z.uuid(),
  firstName: zodString('First name'),
  lastName: zodString('Last name'),
  gender: genderSchema,
  phone: zodNullableString('Phone'),
  birthday: z.iso.date().nullable(),
  role: profileRoleSchema.nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
