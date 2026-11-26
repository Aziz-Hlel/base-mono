import z from 'zod';
import preferredPackageSchema from './enums/preferred-package.schema';
import { zodNullableString, zodString } from './shared/string.zod';
import { zodEmail } from './shared/zodEmail';

export const exhibitorEnquiryBaseSchema = {
  id: z.uuid(),
  companyName: zodString('Company name'),
  sector: zodString('Sector'),
  contactPerson: zodString('Contact person'),
  email: zodEmail(),
  phone: zodString('Phone', { max: 30 }),
  country: zodString('Country', { min: 2, max: 100 }),
  companyWebsite: zodNullableString('Company website'),
  preferredPackage: preferredPackageSchema,
  technicalRequirements: zodNullableString('Technical requirements', { max: 5000 }),
  companyDescription: zodNullableString('Company description', { max: 5000 }),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
