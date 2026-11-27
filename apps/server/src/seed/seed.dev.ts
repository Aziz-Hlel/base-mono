import { contactSeedService } from './services/contact-seed.service';
import { exhibitorEnquirySeedService } from './services/exhibitor-enquiry-seed.service';
import { sponsorEnquirySeedService } from './services/sponsor-enquiry-seed.service';

const devSeed = async () => {
  await contactSeedService.seed();
  await exhibitorEnquirySeedService.seed();
  await sponsorEnquirySeedService.seed();
};

export default devSeed;
