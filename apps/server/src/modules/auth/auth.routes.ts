import { asyncHandler } from '@/core/async-handler';
import { Router } from 'express';
import { authController } from './auth.controller';
import { authMiddleware } from '@/middlewares/app/authenticate';

const authRouter = Router();

// Public routes
authRouter.post('/register', asyncHandler(authController.register));
authRouter.post('/login', asyncHandler(authController.login));
authRouter.post('/oauth', asyncHandler(authController.oauth));
authRouter.post('/refresh', asyncHandler(authController.refresh));

// Protected routes
authRouter.post('/logout', authMiddleware, asyncHandler(authController.logout));
authRouter.get('/me', authMiddleware, asyncHandler(authController.me));

export default authRouter;
