import { z } from 'zod';
import { sponsorEnquiryBaseSchema } from '../../base/sponsor-enquiry.base-schema';

export const sponsorEnquiryResSchema = z
  .object({
    id: sponsorEnquiryBaseSchema.id,
    organizationName: sponsorEnquiryBaseSchema.organizationName,
    sector: sponsorEnquiryBaseSchema.sector,
    contactNameAndRole: sponsorEnquiryBaseSchema.contactNameAndRole,
    workEmail: sponsorEnquiryBaseSchema.workEmail,
    phone: sponsorEnquiryBaseSchema.phone,
    country: sponsorEnquiryBaseSchema.country,
    website: sponsorEnquiryBaseSchema.website,
    preferredSponsorshipLevel: sponsorEnquiryBaseSchema.preferredSponsorshipLevel,
    boothRequirement: sponsorEnquiryBaseSchema.boothRequirement,
    partnershipObjectives: sponsorEnquiryBaseSchema.partnershipObjectives,
    additionalMessage: sponsorEnquiryBaseSchema.additionalMessage,
    agreedToContact: sponsorEnquiryBaseSchema.agreedToContact,
    createdAt: sponsorEnquiryBaseSchema.createdAt,
    updatedAt: sponsorEnquiryBaseSchema.updatedAt,
  })
  .meta({
    id: 'SponsorEnquiryRes',
  });

export type SponsorEnquiryRes = z.infer<typeof sponsorEnquiryResSchema>;
