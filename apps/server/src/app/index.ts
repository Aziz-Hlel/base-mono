import { compressionMiddleware } from '@/middlewares/compression';
import { corsMiddleware } from '@/middlewares/cors.middleware';
import { globalErrorHandler } from '@/middlewares/error.middleware';
import pinoHttpMiddleware from '@/middlewares/logger.middleware';
import notFoundHandler from '@/middlewares/notFoundHandler';
import { responseEnvelope } from '@/middlewares/response.middleware';
import { securityMiddleware } from '@/middlewares/security.middleware';
import cookieParser from 'cookie-parser';
import express from 'express';
import appRoutes from './app.routes';

export function createExpressApp() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(express.json({ limit: '10mb' }));

  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  app.use(cookieParser());

  app.use(securityMiddleware());

  app.use(corsMiddleware());

  app.use(pinoHttpMiddleware);

  app.use(compressionMiddleware);

  app.use(responseEnvelope);

  app.use('/api', appRoutes);

  app.use(notFoundHandler);

  app.use(globalErrorHandler);

  return app;
}
