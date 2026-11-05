import { authMiddleware } from '@/middlewares/authenticate';
import { Router } from 'express';
import { authController } from './auth.controller';

const authRouter = Router();

// Public routes
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);

// Protected routes
authRouter.post('/logout', authMiddleware, authController.logout);
authRouter.get('/me', authMiddleware, authController.me);

export default authRouter;
