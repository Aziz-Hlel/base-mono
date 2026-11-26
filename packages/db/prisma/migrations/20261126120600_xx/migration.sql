/*
  Warnings:

  - You are about to drop the column `authId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `devices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PreferredPackage" AS ENUM ('STARTUP', 'STANDARD', 'PREMIUM');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_userId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_id_fkey";

-- DropIndex
DROP INDEX "users_authId_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "authId",
DROP COLUMN "role",
ALTER COLUMN "username" SET NOT NULL;

-- DropTable
DROP TABLE "devices";

-- DropTable
DROP TABLE "profiles";

-- DropEnum
DROP TYPE "AccountRole";

-- DropEnum
DROP TYPE "AccountStatus";

-- DropEnum
DROP TYPE "DevicePlatform";

-- DropEnum
DROP TYPE "DevicePreferredLanguage";

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "organization" VARCHAR(255),
    "subject" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exhibitor_enquiries" (
    "id" UUID NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "sector" VARCHAR(255) NOT NULL,
    "contactPerson" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "companyWebsite" VARCHAR(255),
    "preferredPackage" VARCHAR(255) NOT NULL,
    "technicalRequirements" TEXT,
    "companyDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exhibitor_enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsor_enquiries" (
    "id" UUID NOT NULL,
    "organizationName" VARCHAR(255) NOT NULL,
    "sector" VARCHAR(255) NOT NULL,
    "contactNameAndRole" VARCHAR(255) NOT NULL,
    "workEmail" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "website" VARCHAR(255),
    "preferredSponsorshipLevel" VARCHAR(255) NOT NULL,
    "boothRequirement" VARCHAR(255) NOT NULL,
    "partnershipObjectives" TEXT,
    "additionalMessage" TEXT,
    "agreedToContact" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsor_enquiries_pkey" PRIMARY KEY ("id")
);
