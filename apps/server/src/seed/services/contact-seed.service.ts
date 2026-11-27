import prisma from '@/db';
import { contactSeedData } from '../data/dev/contact.data';

class ContactSeedService {
  public async seed() {
    const data = Object.values(contactSeedData);

    await prisma.contact.createMany({ data, skipDuplicates: true });
  }
}

export const contactSeedService = new ContactSeedService();
