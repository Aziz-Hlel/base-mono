import { z } from 'zod';
import { exhibitorEnquiryBaseSchema } from '../../base/exhibitor-enquiry.base-schema';

export const exhibitorEnquiryResSchema = z
  .object({
    id: exhibitorEnquiryBaseSchema.id,
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
    createdAt: exhibitorEnquiryBaseSchema.createdAt,
    updatedAt: exhibitorEnquiryBaseSchema.updatedAt,
  })
  .meta({
    id: 'ExhibitorEnquiryRes',
  });

export type ExhibitorEnquiryRes = z.infer<typeof exhibitorEnquiryResSchema>;
