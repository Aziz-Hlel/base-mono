import type { ExhibitorEnquiryRes } from '@excellense/contracts/schemas/exhibitor-enquiry/exhibitor-enquiry.res';
import type { ExhibitorEnquiry, PreferredPackage } from '@excellense/db/prisma';

export class ExhibitorEnquiryMapper {
  static toRes = (enquiry: ExhibitorEnquiry): ExhibitorEnquiryRes => ({
    id: enquiry.id,
    companyName: enquiry.companyName,
    sector: enquiry.sector,
    contactPerson: enquiry.contactPerson,
    email: enquiry.email,
    phone: enquiry.phone,
    country: enquiry.country,
    companyWebsite: enquiry.companyWebsite,
    preferredPackage: enquiry.preferredPackage as PreferredPackage,
    technicalRequirements: enquiry.technicalRequirements,
    companyDescription: enquiry.companyDescription,
    createdAt: enquiry.createdAt.toISOString(),
    updatedAt: enquiry.updatedAt.toISOString(),
  });
}
