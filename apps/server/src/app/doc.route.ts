import { getOpenApiDocumentation } from '@/openapi/generate';
import { Scalar } from '@scalar/express-api-reference';
import { Router } from 'express';

const openApiRouter = Router();

openApiRouter.get('/openapi.json', (_req, res) => {
  res.json(getOpenApiDocumentation());
});

openApiRouter.use(
  '/',
  Scalar({
    spec: {
      content: getOpenApiDocumentation(),
    },
    theme: 'purple',
    darkMode: true,
  }),
);

export default openApiRouter;
