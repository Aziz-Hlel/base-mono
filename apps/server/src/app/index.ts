import { configureCors } from '@/config/cors';
import { configureSecurity } from '@/config/security';
import pinoHttpMiddleware from '@/logger/pinoHttp';
import { compressionMiddleware } from '@/middlewares/compression';
import { globalErrorHandler } from '@/middlewares/error.middleware';
import notFoundHandler from '@/middlewares/notFoundHandler';
import { responseEnvelope } from '@/middlewares/response.middleware';
import cookieParser from 'cookie-parser';
import express from 'express';
import appRoutes from './app.routes';

export function createExpressApp() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(express.json({ limit: '10mb' }));

  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  app.use(cookieParser());

  app.use(...configureSecurity());

  app.use(configureCors());

  app.use(pinoHttpMiddleware);

  app.use(compressionMiddleware);

  app.use(responseEnvelope);

  app.use('/api', appRoutes);

  app.use(notFoundHandler);

  app.use(globalErrorHandler);

  return app;
}
