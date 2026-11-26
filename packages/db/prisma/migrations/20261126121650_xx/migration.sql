/*
  Warnings:

  - Changed the type of `preferredSponsorshipLevel` on the `sponsor_enquiries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `boothRequirement` on the `sponsor_enquiries` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PreferredSponsorshipLevel" AS ENUM ('PLATINUM', 'GOLD', 'SILVER', 'BRONZE');

-- CreateEnum
CREATE TYPE "BoothRequirement" AS ENUM ('EXHIBITOR', 'NO', 'TO_BE_DISCUSSED');

-- AlterTable
ALTER TABLE "sponsor_enquiries" DROP COLUMN "preferredSponsorshipLevel",
ADD COLUMN     "preferredSponsorshipLevel" "PreferredSponsorshipLevel" NOT NULL,
DROP COLUMN "boothRequirement",
ADD COLUMN     "boothRequirement" "BoothRequirement" NOT NULL;
