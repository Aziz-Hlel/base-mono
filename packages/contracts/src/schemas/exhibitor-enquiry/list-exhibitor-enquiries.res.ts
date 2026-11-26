import { z } from 'zod';
import { exhibitorEnquiryResSchema } from './exhibitor-enquiry.res';

export const listExhibitorEnquiriesResSchema = z.array(exhibitorEnquiryResSchema).meta({
  id: 'ListExhibitorEnquiriesRes',
  description: 'List of exhibitor enquiries',
});

export type ListExhibitorEnquiriesRes = z.infer<typeof listExhibitorEnquiriesResSchema>;
