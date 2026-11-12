/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[authId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MedicalSpecialty" AS ENUM ('MEDICAL_ONCOLOGIST', 'RADIATION_ONCOLOGIST', 'SURGICAL_ONCOLOGIST', 'HEMATOLOGIST', 'PEDIATRIC_ONCOLOGIST', 'PSYCHO_ONCOLOGIST', 'PSYCHOLOGIST', 'DIETITIAN', 'PHYSIOTHERAPIST', 'PALLIATIVE_CARE', 'GENERAL_PRACTITIONER', 'NURSE');

-- CreateEnum
CREATE TYPE "GuardianRelationship" AS ENUM ('FAMILY', 'PARENT', 'SPOUSE', 'CHILD', 'SIBLING', 'RELATIVE', 'FRIEND', 'CAREGIVER', 'OTHER');

-- CreateEnum
CREATE TYPE "GuardianLinkStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REVOKED');

-- CreateEnum
CREATE TYPE "CancerStage" AS ENUM ('STAGE_0', 'STAGE_I', 'STAGE_II', 'STAGE_III', 'STAGE_IV');

-- CreateEnum
CREATE TYPE "JourneyStage" AS ENUM ('NEWLY_DIAGNOSED', 'IN_TREATMENT', 'POST_TREATMENT', 'SURVIVORSHIP', 'PALLIATIVE');

-- CreateEnum
CREATE TYPE "DietaryRestriction" AS ENUM ('VEGETARIAN', 'VEGAN', 'GLUTEN_FREE', 'LACTOSE_FREE', 'LOW_SODIUM', 'DIABETIC', 'SOFT_FOOD');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE');

-- CreateEnum
CREATE TYPE "CancerType" AS ENUM ('BREAST', 'LUNG', 'COLORECTAL', 'PROSTATE', 'LEUKEMIA', 'LYMPHOMA', 'CERVICAL', 'THYROID', 'OTHER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SYSTEM', 'SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ProfileRole" AS ENUM ('PATIENT', 'GUARDIAN', 'DOCTOR');

-- DropIndex
DROP INDEX "users_authId_idx";

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "role" "ProfileRole" DEFAULT 'PATIENT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "AccountRole";

-- DropEnum
DROP TYPE "AccountStatus";

-- CreateTable
CREATE TABLE "doctors" (
    "id" UUID NOT NULL,
    "titleEn" VARCHAR(50),
    "titleAr" VARCHAR(50),
    "bioEn" TEXT,
    "bioAr" TEXT,
    "specialty" "MedicalSpecialty" NOT NULL,
    "subSpecialties" "MedicalSpecialty"[],
    "cancerFocus" "CancerType"[],
    "practiceStartYear" INTEGER,
    "licenseNumber" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guardians" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guardians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuardianPatient" (
    "id" UUID NOT NULL,
    "relationship" "GuardianRelationship" NOT NULL,
    "linkStatus" "GuardianLinkStatus" NOT NULL DEFAULT 'PENDING',
    "canViewMedicalInfo" BOOLEAN NOT NULL DEFAULT false,
    "canManageAppointments" BOOLEAN NOT NULL DEFAULT false,
    "canManageMedications" BOOLEAN NOT NULL DEFAULT false,
    "receivesNotifications" BOOLEAN NOT NULL DEFAULT true,
    "guardianId" UUID NOT NULL,
    "patientId" UUID NOT NULL,

    CONSTRAINT "GuardianPatient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" UUID NOT NULL,
    "cancerType" "CancerType",
    "cancerSubtype" VARCHAR(255),
    "cancerStage" "CancerStage",
    "journeyStage" "JourneyStage" NOT NULL DEFAULT 'NEWLY_DIAGNOSED',
    "allergies" TEXT[],
    "dietaryRestrictions" "DietaryRestriction"[],
    "activityLevel" "ActivityLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuardianPatient_guardianId_key" ON "GuardianPatient"("guardianId");

-- CreateIndex
CREATE UNIQUE INDEX "GuardianPatient_guardianId_patientId_key" ON "GuardianPatient"("guardianId", "patientId");

-- CreateIndex
CREATE INDEX "patients_journeyStage_idx" ON "patients"("journeyStage");

-- CreateIndex
CREATE INDEX "patients_cancerType_idx" ON "patients"("cancerType");

-- CreateIndex
CREATE UNIQUE INDEX "users_authId_key" ON "users"("authId");

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_id_fkey" FOREIGN KEY ("id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardians" ADD CONSTRAINT "guardians_id_fkey" FOREIGN KEY ("id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuardianPatient" ADD CONSTRAINT "GuardianPatient_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "guardians"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuardianPatient" ADD CONSTRAINT "GuardianPatient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_id_fkey" FOREIGN KEY ("id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
