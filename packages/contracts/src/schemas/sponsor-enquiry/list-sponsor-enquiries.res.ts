import { z } from 'zod';
import { sponsorEnquiryResSchema } from './sponsor-enquiry.res';

export const listSponsorEnquiriesResSchema = z.array(sponsorEnquiryResSchema).meta({
  id: 'ListSponsorEnquiriesRes',
  description: 'List of sponsor enquiries',
});

export type ListSponsorEnquiriesRes = z.infer<typeof listSponsorEnquiriesResSchema>;
