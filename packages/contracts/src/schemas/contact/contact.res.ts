import { z } from 'zod';
import { contactBaseSchema } from '../../base/contact.base-schema';

export const contactResSchema = z
  .object({
    id: contactBaseSchema.id,
    name: contactBaseSchema.name,
    email: contactBaseSchema.email,
    organization: contactBaseSchema.organization,
    subject: contactBaseSchema.subject,
    message: contactBaseSchema.message,
    createdAt: contactBaseSchema.createdAt,
    updatedAt: contactBaseSchema.updatedAt,
  })
  .meta({
    id: 'ContactRes',
  });

export type ContactRes = z.infer<typeof contactResSchema>;
