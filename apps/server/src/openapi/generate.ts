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
  servers: [{ url: 'http://localhost:3000' }],
});

export default openApiDoc;
