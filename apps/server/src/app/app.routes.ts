import authRouter from '@/modules/auth/auth.routes';
import contactRouter from '@/modules/contact/contact.routes';
import exhibitorEnquiryRouter from '@/modules/exhibitor-enquiry/exhibitor-enquiry.routes';
import rootRouter from '@/modules/root/root.routes';
import sponsorEnquiryRouter from '@/modules/sponsor-enquiry/sponsor-enquiry.routes';
import { Router } from 'express';

const appRoutes = Router();

appRoutes.use('/', rootRouter);
appRoutes.use('/auth', authRouter);
appRoutes.use('/contacts', contactRouter);
appRoutes.use('/exhibitor-enquiries', exhibitorEnquiryRouter);
appRoutes.use('/sponsor-enquiries', sponsorEnquiryRouter);

export default appRoutes;
