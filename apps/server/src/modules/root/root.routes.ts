import { route } from '@/openapi/routeBuilder';
import { isDev } from '@excellense/env/server';
import { Router } from 'express';
import { z } from 'zod';
import { rootService } from './root.service';

const rootRouter = Router();

const healthResSchema = z.null();

const healthzResSchema = z.object({
  timestamp: z.date(),
  uptime: z.number(),
  memoryUsage: z.object({
    rss: z.number(),
    heapTotal: z.number(),
    heapUsed: z.number(),
    external: z.number(),
    arrayBuffers: z.number(),
  }),
});

const hardResetResSchema = z.null();

// GET /api/health
route()
  .router(rootRouter)
  .method('get')
  .path('/health')
  .openapiPath('/api/health')
  .operationId('getHealth')
  .summary('Health check')
  .description('Public liveness check endpoint.')
  .tags('Root')
  .define({
    auth: false,
    userRoles: [],
    validate: {},
    response: healthResSchema,
    responses: {
      '200': {
        description: 'Service is healthy',
        schema: healthResSchema,
      },
    },
    controller: async (_req, res) => {
      res.json({
        message: 'i feel good !',
        data: null,
      });
    },
  });

// GET /api/healthz
route()
  .router(rootRouter)
  .method('get')
  .path('/healthz')
  .openapiPath('/api/healthz')
  .operationId('getHealthz')
  .summary('Detailed health check')
  .description('Authenticated health check returning uptime and memory usage.')
  .tags('Root')
  .define({
    auth: true,
    userRoles: [],
    validate: {},
    response: healthzResSchema,
    responses: {
      '200': {
        description: 'Detailed health status fetched successfully',
        schema: healthzResSchema,
      },
    },
    controller: async (_req, res) => {
      res.json({
        message: 'i feel good !',
        data: {
          timestamp: new Date(),
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
        },
      });
    },
  });

// DELETE /api/hard-reset
if (isDev()) {
  route()
    .router(rootRouter)
    .method('delete')
    .path('/hard-reset')
    .openapiPath('/api/hard-reset')
    .operationId('hardReset')
    .summary('Hard reset database and cache')
    .description('Development-only endpoint that flushes Redis and force-resets the database.')
    .tags('Root')
    .define({
      auth: false,
      userRoles: [],
      validate: {},
      response: hardResetResSchema,
      responses: {
        '200': {
          description: 'DB and Cache reset successfully',
          schema: hardResetResSchema,
        },
      },
      controller: async (_req, res) => {
        await rootService.hardReset();

        res.json({
          message: 'DB and Cache reset successfully!',
          data: null,
        });
      },
    });
}

export default rootRouter;
