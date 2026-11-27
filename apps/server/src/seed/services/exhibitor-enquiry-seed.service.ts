import prisma from '@/db';
import { exhibitorEnquirySeedData } from '../data/dev/exhibitor-enquiry.data';

class ExhibitorEnquirySeedService {
  public async seed() {
    const data = Object.values(exhibitorEnquirySeedData);

    await prisma.exhibitorEnquiry.createMany({ data, skipDuplicates: true });
  }
}

export const exhibitorEnquirySeedService = new ExhibitorEnquirySeedService();
