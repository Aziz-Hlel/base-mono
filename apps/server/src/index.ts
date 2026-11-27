import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { z } from 'zod';
import { createExpressApp } from './app';
import initializeServices from './bootstrap';
import ENV from './env';
import { getOpenApiDocumentation } from './openapi/generate';
import seed from './seed';

const genOpenApiYaml = () => {
  const document = getOpenApiDocumentation();

  const outputPath = path.resolve(process.cwd(), 'openapi.yaml');

  fs.writeFileSync(outputPath, YAML.stringify(document), 'utf8');
};

async function start() {
  extendZodWithOpenApi(z);
  await initializeServices();
  await seed();
  const app = createExpressApp();
  genOpenApiYaml();
  app.on('mount', (error) => {
    console.error('❌ ERROR : oops Server failed to start', error);
    process.exit(1);
  });
  app.listen(ENV.API_PORT, () => {
    console.log(`✅ SUCCESS : Server running on port ${ENV.API_PORT}`);
  });
}

start();
