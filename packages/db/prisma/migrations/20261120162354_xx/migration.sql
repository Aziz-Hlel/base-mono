-- CreateEnum
CREATE TYPE "FeedStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'HEART');

-- AlterTable
ALTER TABLE "guardianship" ADD COLUMN     "canViewDiaryNotes" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "diary_notes" (
    "id" TEXT NOT NULL,
    "profileId" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diary_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed_reactions" (
    "feedId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "reaction" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feed_reactions_pkey" PRIMARY KEY ("feedId","profileId")
);

-- CreateTable
CREATE TABLE "feeds" (
    "id" UUID NOT NULL,
    "diaryNoteId" TEXT NOT NULL,
    "status" "FeedStatus" NOT NULL DEFAULT 'PENDING',
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "journeyStage" "JourneyStage" NOT NULL,
    "relationShip" "GuardianRelationship",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiaryNotesToMedia" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_DiaryNotesToMedia_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "diary_notes_profileId_createdAt_idx" ON "diary_notes"("profileId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "feeds_diaryNoteId_key" ON "feeds"("diaryNoteId");

-- CreateIndex
CREATE INDEX "feeds_status_createdAt_idx" ON "feeds"("status", "createdAt");

-- CreateIndex
CREATE INDEX "feeds_isPinned_idx" ON "feeds"("isPinned");

-- CreateIndex
CREATE INDEX "_DiaryNotesToMedia_B_index" ON "_DiaryNotesToMedia"("B");

-- AddForeignKey
ALTER TABLE "diary_notes" ADD CONSTRAINT "diary_notes_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed_reactions" ADD CONSTRAINT "feed_reactions_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "feeds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed_reactions" ADD CONSTRAINT "feed_reactions_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeds" ADD CONSTRAINT "feeds_diaryNoteId_fkey" FOREIGN KEY ("diaryNoteId") REFERENCES "diary_notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryNotesToMedia" ADD CONSTRAINT "_DiaryNotesToMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "diary_notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryNotesToMedia" ADD CONSTRAINT "_DiaryNotesToMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
