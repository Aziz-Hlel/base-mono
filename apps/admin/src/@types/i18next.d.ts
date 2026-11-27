import 'react-i18next';
import type common from '../../public/locales/en/common.json';
import type contacts from '../../public/locales/en/contacts.json';
import type exhibitorEnquiries from '../../public/locales/en/exhibitor-enquiries.json';
import type sidebar from '../../public/locales/en/sidebar.json';
import type sponsorEnquiries from '../../public/locales/en/sponsor-enquiries.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      contacts: typeof contacts;
      'exhibitor-enquiries': typeof exhibitorEnquiries;
      sidebar: typeof sidebar;
      'sponsor-enquiries': typeof sponsorEnquiries;
    };
  }
}
