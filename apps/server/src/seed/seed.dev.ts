import { calendarSeedService } from './services/calendar-seed.service';
import { diaryNotesSeedService } from './services/diary-notes-seed.service';
import { doctorSeedService } from './services/doctor-seed.service';
import { feedSeedService } from './services/feed-seed.service';
import { guardianSeedService } from './services/guardian-seed.service';
import { guardianshipSeedService } from './services/guardianship-seed.service';
import { patientSeedService } from './services/patient-seed.service';
import { profileSeedService } from './services/profile-seed.service';
import { userSeedService } from './services/user-seed.service';

const devSeed = async () => {
  await userSeedService.seed();
  await profileSeedService.seed();
  await patientSeedService.seed();
  await guardianSeedService.seed();
  await guardianshipSeedService.seed();
  await doctorSeedService.seed();
  await calendarSeedService.seed();
  await diaryNotesSeedService.seed();
  await feedSeedService.seed();
};

export default devSeed;
