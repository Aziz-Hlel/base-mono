import authRouter from '@/modules/auth/auth.routes';
import diaryNoteRouter from '@/modules/diary-note/diary-note.routes';
import doctorRouter from '@/modules/doctor/doctor.routes';
import feedRouter from '@/modules/feed/feed.routes';
import feelingLogRouter from '@/modules/feeling-log/feeling-log.routes';
import guardianRouter from '@/modules/guardian/guardian.routes';
import guardianshipRouter from '@/modules/guardianship/guardianship.routes';
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
appRoutes.use('/guardianships', guardianshipRouter);
appRoutes.use('/patients/:patientId/feeling-logs', feelingLogRouter);
appRoutes.use('/profiles/:profileId/diary-notes', diaryNoteRouter);
appRoutes.use('/feeds', feedRouter);

export default appRoutes;
