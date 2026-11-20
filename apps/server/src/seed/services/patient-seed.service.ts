import prisma from '@/db';
import { patientSeedData } from '../data/dev';

class PatientSeedService {
  public async seed() {
    const data = Object.values(patientSeedData);

    await prisma.patient.createMany({ data, skipDuplicates: true });
  }
}

export const patientSeedService = new PatientSeedService();
