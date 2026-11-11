import openApiDoc from '@/openapi/generate';
import { apiReference } from '@scalar/express-api-reference';
import { Router } from 'express';

const openApiRouter = Router();

openApiRouter.get('/api-docs/openapi.json', (_req, res) => {
  res.json(openApiDoc);
});

openApiRouter.use(
  '/api-docs',
  apiReference({
    spec: {
      content: openApiDoc,
    },
    theme: 'purple',
    darkMode: true,
  }),
);

export default openApiRouter;
