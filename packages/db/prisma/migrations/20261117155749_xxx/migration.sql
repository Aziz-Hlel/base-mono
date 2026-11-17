/*
  Warnings:

  - The values [PALLIATIVE] on the enum `JourneyStage` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[avatarId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DELETED', 'FAILED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- AlterEnum
BEGIN;
CREATE TYPE "JourneyStage_new" AS ENUM ('NEWLY_DIAGNOSED', 'IN_TREATMENT', 'POST_TREATMENT', 'SURVIVORSHIP');
ALTER TABLE "public"."patients" ALTER COLUMN "journeyStage" DROP DEFAULT;
ALTER TABLE "patients" ALTER COLUMN "journeyStage" TYPE "JourneyStage_new" USING ("journeyStage"::text::"JourneyStage_new");
ALTER TYPE "JourneyStage" RENAME TO "JourneyStage_old";
ALTER TYPE "JourneyStage_new" RENAME TO "JourneyStage";
DROP TYPE "public"."JourneyStage_old";
ALTER TABLE "patients" ALTER COLUMN "journeyStage" SET DEFAULT 'NEWLY_DIAGNOSED';
COMMIT;

-- AlterTable
ALTER TABLE "GuardianPatient" ALTER COLUMN "relationship" DROP NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "avatarId" UUID;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Media" (
    "id" UUID NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "baseName" VARCHAR(255) NOT NULL,
    "type" "MediaType" NOT NULL,
    "mimeType" VARCHAR(255) NOT NULL,
    "fileSize" INTEGER,
    "status" "MediaStatus" NOT NULL DEFAULT 'PENDING',
    "blurHash" VARCHAR(255),
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_key_key" ON "Media"("key");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_avatarId_key" ON "profiles"("avatarId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
