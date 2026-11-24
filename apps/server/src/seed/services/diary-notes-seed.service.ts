import prisma from '@/db';
import { diaryNotesSeedData } from '../data/dev/diary-notes.data';

class DiaryNotesSeedService {
  public async seed() {
    const data = Object.values(diaryNotesSeedData);

    await prisma.diaryNotes.createMany({ data, skipDuplicates: true });
  }
}

export const diaryNotesSeedService = new DiaryNotesSeedService();
