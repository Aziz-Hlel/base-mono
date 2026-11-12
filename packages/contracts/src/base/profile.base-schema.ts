import z from 'zod';
import genderSchema from './enums/gender.schema';
import { zodString } from './shared/string.zod';

export const profileBaseSchema = {
  id: z.uuid(),
  firstName: zodString('First name'),
  lastName: zodString('Last name'),
  gender: genderSchema,
  phone: z.string().trim().max(15).nullable(),
  birthday: z.iso.date().nullable(),
};
