import appRoutes from './routes';
import { configureCors } from '@/config/cors';
import { configureSecurity } from '@/config/security';
import { pinoHttpMiddleware } from '@/logger/pinoHttp';
import { compressionMiddleware } from '@/middlewares/compression';
import { globalErrorHandler } from '@/middlewares/error.middleware';
import notFoundHandler from '@/middlewares/notFoundHandler';
import express from 'express';

export function createExpressApp() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(express.json({ limit: '10mb' }));

  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  app.use(...configureSecurity());

  app.use(configureCors());

  app.use(pinoHttpMiddleware);

  app.use(compressionMiddleware);

  app.use('/api', appRoutes);

  app.use(notFoundHandler);

  app.use(globalErrorHandler);

  return app;
}
