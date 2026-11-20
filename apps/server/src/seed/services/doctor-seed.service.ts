import prisma from '@/db';
import { doctorSeedData } from '../data/dev';

class DoctorSeedService {
  public async seed() {
    const data = Object.values(doctorSeedData);

    await prisma.doctor.createMany({ data, skipDuplicates: true });
  }
}

export const doctorSeedService = new DoctorSeedService();
