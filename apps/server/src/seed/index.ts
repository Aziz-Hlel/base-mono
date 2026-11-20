import { isDev } from '@base-monorepo-v2/env/server';
import devSeed from './seed.dev';
import prodSeed from './seed.prod';
import sharedSeed from './seed.shared';

const seed = async () => {
  await sharedSeed();
  if (isDev()) await devSeed();
  else await prodSeed();
  console.log('✅ SUCCESS : Seed ran successfully');
};

export default seed;
