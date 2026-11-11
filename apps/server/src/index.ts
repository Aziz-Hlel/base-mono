import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { createExpressApp } from './app';
import initializeServices from './bootstrap';
import ENV from './env';

async function start() {
  extendZodWithOpenApi(z);
  await initializeServices();

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
