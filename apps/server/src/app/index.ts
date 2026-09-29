import appRoutes from './routes';
import { configureCors } from '@/config/cors';
import { configureSecurity } from '@/config/security';
import { pinoHttpMiddleware } from '@/logger/pinoHttp';
import { compressionMiddleware } from '@/middlewares/compression';
import { globalErrorHandler } from '@/middlewares/error.middleware';
import express, { type NextFunction, type Request, type Response } from 'express';

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

  app.use((req: Request, res: Response, _: NextFunction) => {
    res.status(404).json({
      message: `Route ${req.method} ${req.originalUrl} not found`,
    });
    res.success('NOT_FOUND', 'Route not found');
  });

  app.use(globalErrorHandler);

  return app;
}
