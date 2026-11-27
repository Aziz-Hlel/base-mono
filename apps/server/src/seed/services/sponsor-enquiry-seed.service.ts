import prisma from '@/db';
import { sponsorEnquirySeedData } from '../data/dev/sponsor-enquiry.data';

class SponsorEnquirySeedService {
  public async seed() {
    const data = Object.values(sponsorEnquirySeedData);

    await prisma.sponsorEnquiry.createMany({ data, skipDuplicates: true });
  }
}

export const sponsorEnquirySeedService = new SponsorEnquirySeedService();
