import z from 'zod';
import { zodNullableString, zodString } from './shared/string.zod';
import { zodEmail } from './shared/zodEmail';

export const contactBaseSchema = {
  id: z.uuid(),
  name: zodString('Name'),
  email: zodEmail(),
  organization: zodNullableString('Organization'),
  subject: zodString('Subject'),
  message: zodString('Message', { max: 5000 }),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
