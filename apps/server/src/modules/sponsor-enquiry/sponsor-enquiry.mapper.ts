import type { SponsorEnquiryRes } from '@excellense/contracts/schemas/sponsor-enquiry/sponsor-enquiry.res';
import type { SponsorEnquiry } from '@excellense/db/prisma';

export class SponsorEnquiryMapper {
  static toRes = (enquiry: SponsorEnquiry): SponsorEnquiryRes => ({
    id: enquiry.id,
    organizationName: enquiry.organizationName,
    sector: enquiry.sector,
    contactNameAndRole: enquiry.contactNameAndRole,
    workEmail: enquiry.workEmail,
    phone: enquiry.phone,
    country: enquiry.country,
    website: enquiry.website,
    preferredSponsorshipLevel: enquiry.preferredSponsorshipLevel,
    boothRequirement: enquiry.boothRequirement,
    partnershipObjectives: enquiry.partnershipObjectives,
    additionalMessage: enquiry.additionalMessage,
    agreedToContact: enquiry.agreedToContact,
    createdAt: enquiry.createdAt.toISOString(),
    updatedAt: enquiry.updatedAt.toISOString(),
  });
}
