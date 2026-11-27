import { adminSeedService } from './services/admin-seed.service';

const sharedSeed = async () => {
  await adminSeedService.seed();
};

export default sharedSeed;
