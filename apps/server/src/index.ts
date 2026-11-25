import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { createServer } from 'node:http';
import { z } from 'zod';
import { createExpressApp } from './app';
import initializeServices from './bootstrap';
import ENV from './env';
import seed from './seed';
import { socketProvider } from './socket';

async function start() {
  extendZodWithOpenApi(z);
  await initializeServices();
  await seed();

  const app = createExpressApp();

  app.on('mount', (error) => {
    console.error('❌ ERROR : oops Server failed to start', error);
    process.exit(1);
  });

  const httpServer = createServer(app);
  socketProvider.createSocketServer(httpServer);

  httpServer.listen(ENV.API_PORT, () => {
    console.log(`✅ SUCCESS : Server running on port ${ENV.API_PORT}`);
  });
}

start();
