import ENV from '@/env';
import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { serverRegistry } from '.';

const generator = new OpenApiGeneratorV31(serverRegistry.definitions);

const openApiDoc = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    title: 'JKID API Reference',
    version: '1.0.0',
    description: 'Production API documentation powered by Zod and Scalar',
  },
  servers: [{ url: `http://localhost:${ENV.API_PORT}` }],
});

export default openApiDoc;

export function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV31(serverRegistry.definitions);
  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'KHAIAL API Reference',
      version: '1.0.0',
      description: 'Production API documentation powered by Zod and Scalar',
    },
    servers: [{ url: 'http://localhost:3000' }],
  });
}
