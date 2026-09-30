import z from 'zod';
import { Gender } from '../enums';
import { requiredZodString } from './shared/required-string.zod';

export const userBaseSchema = {
  id: z.uuid(),
  firstName: requiredZodString('first name'),
  lastName: requiredZodString('last name'),
  gender: z.enum(Gender),
  phone: z.string().trim().max(15).nullable(),
  birthday: z.iso.date().nullable(),
};
