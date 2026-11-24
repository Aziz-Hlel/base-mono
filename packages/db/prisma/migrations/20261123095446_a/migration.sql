/*
  Warnings:

  - The primary key for the `_DiaryNotesToMedia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `diary_notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `diaryNoteId` on the `feeds` table. All the data in the column will be lost.
  - Changed the type of `A` on the `_DiaryNotesToMedia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `diary_notes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_DiaryNotesToMedia" DROP CONSTRAINT "_DiaryNotesToMedia_A_fkey";

-- DropForeignKey
ALTER TABLE "feeds" DROP CONSTRAINT "feeds_diaryNoteId_fkey";

-- DropIndex
DROP INDEX "feeds_diaryNoteId_key";

-- DropIndex
DROP INDEX "feeds_status_createdAt_idx";

-- AlterTable
ALTER TABLE "_DiaryNotesToMedia" DROP CONSTRAINT "_DiaryNotesToMedia_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" UUID NOT NULL,
ADD CONSTRAINT "_DiaryNotesToMedia_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "diary_notes" DROP CONSTRAINT "diary_notes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "diary_notes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "feeds" DROP COLUMN "diaryNoteId",
ADD COLUMN     "approvedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "feeds_status_approvedAt_idx" ON "feeds"("status", "approvedAt");

-- AddForeignKey
ALTER TABLE "feeds" ADD CONSTRAINT "feeds_id_fkey" FOREIGN KEY ("id") REFERENCES "diary_notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryNotesToMedia" ADD CONSTRAINT "_DiaryNotesToMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "diary_notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
