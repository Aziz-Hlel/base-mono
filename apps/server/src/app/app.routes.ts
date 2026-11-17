import authRouter from '@/modules/auth/auth.routes';
import doctorRouter from '@/modules/doctor/doctor.routes';
import guardianRouter from '@/modules/guardian/guardian.routes';
import patientRouter from '@/modules/patient/patient.routes';
import profileRouter from '@/modules/profile/profile.routes';
import userRouter from '@/modules/users/user.routes';
import { Router } from 'express';

const appRoutes = Router();

appRoutes.use('/auth', authRouter);
appRoutes.use('/users', userRouter);
appRoutes.use('/profiles', profileRouter);
appRoutes.use('/doctors', doctorRouter);
appRoutes.use('/patients', patientRouter);
appRoutes.use('/guardians', guardianRouter);

export default appRoutes;
