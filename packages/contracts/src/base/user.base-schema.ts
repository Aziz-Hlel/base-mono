import z from 'zod';
import { Gender } from '../enums';
import { zodString } from './shared/required-string.zod';

export const userBaseSchema = {
  id: z.uuid(),
  firstName: zodString('First name'),
  lastName: zodString('Last name'),
  gender: z.enum(Gender),
  phone: z.string().trim().max(15).nullable(),
  birthday: z.iso.date().nullable(),
};
