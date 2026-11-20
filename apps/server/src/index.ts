import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { createExpressApp } from './app';
import initializeServices from './bootstrap';
import ENV from './env';
import seed from './seed';

async function start() {
  extendZodWithOpenApi(z);
  await initializeServices();
  await seed();

  const app = createExpressApp();
  app.on('mount', (error) => {
    console.error('❌ ERROR : oops Server failed to start', error);
    process.exit(1);
  });
  app.listen(ENV.API_PORT, () => {
    console.log(`✅ SUCCESS : Server running on port ${ENV.API_PORT}`);
  });
}

start();
