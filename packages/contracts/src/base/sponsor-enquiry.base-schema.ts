import z from 'zod';
import boothRequirementSchema from './enums/booth-requirement.schema';
import preferredSponsorshipLevelSchema from './enums/preferred-sponsorship-level.schema';
import { zodNullableString, zodString } from './shared/string.zod';
import { zodEmail } from './shared/zodEmail';

export const sponsorEnquiryBaseSchema = {
  id: z.uuid(),
  organizationName: zodString('Organization name'),
  sector: zodString('Sector'),
  contactNameAndRole: zodString('Contact name and role'),
  workEmail: zodEmail(),
  phone: zodString('Phone', { max: 30 }),
  country: zodString('Country', { min: 2, max: 100 }),
  website: zodNullableString('Website'),
  preferredSponsorshipLevel: preferredSponsorshipLevelSchema,
  boothRequirement: boothRequirementSchema,
  partnershipObjectives: zodNullableString('Partnership objectives', { max: 5000 }),
  additionalMessage: zodNullableString('Additional message', { max: 5000 }),
  agreedToContact: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
