import { authController } from './auth.controller';
import { authenticate } from '@/middlewares/authenticate';
import { Router } from 'express';

const authRouter = Router();

// Public routes
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);

// Protected routes
authRouter.post('/logout', authenticate, authController.logout);
authRouter.get('/me', authenticate, authController.me);

export default authRouter;
