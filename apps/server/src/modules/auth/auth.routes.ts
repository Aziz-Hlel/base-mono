import { asyncHandler } from '@/core/async-handler';
import { authMiddleware } from '@/middlewares/authenticate';
import { Router } from 'express';
import { authController } from './auth.controller';

const authRouter = Router();

// Public routes
authRouter.post('/register', asyncHandler(authController.register));
authRouter.post('/login', asyncHandler(authController.login));
authRouter.post('/refresh', asyncHandler(authController.refresh));

// Protected routes
authRouter.post('/logout', authMiddleware, asyncHandler(authController.logout));
authRouter.get('/me', authMiddleware, asyncHandler(authController.me));

export default authRouter;
