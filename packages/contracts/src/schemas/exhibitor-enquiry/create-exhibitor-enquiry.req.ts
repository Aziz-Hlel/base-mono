import { z } from 'zod';
import { exhibitorEnquiryBaseSchema } from '../../base/exhibitor-enquiry.base-schema';

export const createExhibitorEnquiryReqSchema = z
  .object({
    companyName: exhibitorEnquiryBaseSchema.companyName,
    sector: exhibitorEnquiryBaseSchema.sector,
    contactPerson: exhibitorEnquiryBaseSchema.contactPerson,
    email: exhibitorEnquiryBaseSchema.email,
    phone: exhibitorEnquiryBaseSchema.phone,
    country: exhibitorEnquiryBaseSchema.country,
    companyWebsite: exhibitorEnquiryBaseSchema.companyWebsite,
    preferredPackage: exhibitorEnquiryBaseSchema.preferredPackage,
    technicalRequirements: exhibitorEnquiryBaseSchema.technicalRequirements,
    companyDescription: exhibitorEnquiryBaseSchema.companyDescription,
  })
  .meta({
    id: 'CreateExhibitorEnquiryReq',
  });

export type CreateExhibitorEnquiryReq = z.infer<typeof createExhibitorEnquiryReqSchema>;
