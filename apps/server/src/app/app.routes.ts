import authRouter from '@/modules/auth/auth.routes';
import { Router } from 'express';

const appRoutes = Router();

appRoutes.use('/auth', authRouter);

export default appRoutes;
