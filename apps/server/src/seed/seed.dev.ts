import { adminSeedService } from './services/admin-seed.service';
import { doctorSeedService } from './services/doctor-seed.service';
import { guardianSeedService } from './services/guardian-seed.service';
import { guardianshipSeedService } from './services/guardianship-seed.service';
import { patientSeedService } from './services/patient-seed.service';
import { profileSeedService } from './services/profile-seed.service';
import { userSeedService } from './services/user-seed.service';

const devSeed = async () => {
  await adminSeedService.seed();
  await userSeedService.seed();
  await profileSeedService.seed();
  await patientSeedService.seed();
  await guardianSeedService.seed();
  await guardianshipSeedService.seed();
  await doctorSeedService.seed();
};

export default devSeed;
