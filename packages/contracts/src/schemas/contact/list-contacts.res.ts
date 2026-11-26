import { z } from 'zod';
import { contactResSchema } from './contact.res';

export const listContactsResSchema = z.array(contactResSchema).meta({
  id: 'ListContactsRes',
  description: 'List of contact enquiries',
});

export type ListContactsRes = z.infer<typeof listContactsResSchema>;
