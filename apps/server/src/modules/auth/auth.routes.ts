import { asyncHandler } from '@/core/async-handler';
import { authMiddleware } from '@/middlewares/app/authenticate';
import { route } from '@/openapi/routeBuilder';
import { meResSchema } from '@excellense/contracts/schemas/auth/me.res';
import { Router } from 'express';
import { authController } from './auth.controller';
import { authService } from './auth.service';

const authRouter = Router();

// Public routes
authRouter.post('/register', asyncHandler(authController.register));
authRouter.post('/login', asyncHandler(authController.login));
authRouter.post('/refresh', asyncHandler(authController.refresh));

// Protected routes
authRouter.post('/logout', authMiddleware, asyncHandler(authController.logout));

// GET /api/auth/me
route()
  .router(authRouter)
  .method('get')
  .path('/me')
  .openapiPath('/api/auth/me')
  .operationId('getMe')
  .summary('Get current authenticated user')
  .description('Returns the authenticated user.')
  .tags('Auth')
  .define({
    auth: true,
    userRoles: [],
    validate: {},
    response: meResSchema,
    responses: {
      '200': { description: 'Current user fetched successfully', schema: meResSchema },
      '401': { description: 'Unauthorized' },
    },

    controller: async (req, res) => {
      const data = await authService.getMe(req.user.id);

      res.json({
        message: 'Current user fetched successfully',
        data,
      });
    },
  });

export default authRouter;
