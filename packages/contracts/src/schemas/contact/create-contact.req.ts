import { z } from 'zod';
import { contactBaseSchema } from '../../base/contact.base-schema';

export const createContactReqSchema = z
  .object({
    name: contactBaseSchema.name,
    email: contactBaseSchema.email,
    organization: contactBaseSchema.organization,
    subject: contactBaseSchema.subject,
    message: contactBaseSchema.message,
  })
  .meta({
    id: 'CreateContactReq',
  });

export type CreateContactReq = z.infer<typeof createContactReqSchema>;
