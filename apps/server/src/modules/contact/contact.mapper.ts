import type { ContactRes } from '@excellense/contracts/schemas/contact/contact.res';
import type { Contact } from '@excellense/db/prisma';

export class ContactMapper {
  static toRes = (contact: Contact): ContactRes => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    organization: contact.organization,
    subject: contact.subject,
    message: contact.message,
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
  });
}
