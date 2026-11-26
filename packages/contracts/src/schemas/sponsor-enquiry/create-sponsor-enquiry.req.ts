import { z } from 'zod';
import { sponsorEnquiryBaseSchema } from '../../base/sponsor-enquiry.base-schema';

export const createSponsorEnquiryReqSchema = z
  .object({
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
  })
  .meta({
    id: 'CreateSponsorEnquiryReq',
  });

export type CreateSponsorEnquiryReq = z.infer<typeof createSponsorEnquiryReqSchema>;
