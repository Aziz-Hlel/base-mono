import openApiDoc from '@/openapi/generate';
import { Scalar } from '@scalar/express-api-reference';
import { Router } from 'express';

const openApiRouter = Router();

openApiRouter.get('/openapi.json', (_req, res) => {
  res.json(openApiDoc);
});

openApiRouter.use(
  '/',
  Scalar({
    spec: {
      content: openApiDoc,
    },
    theme: 'purple',
    darkMode: true,
  }),
);

export default openApiRouter;
