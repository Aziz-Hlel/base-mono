-- CreateEnum
CREATE TYPE "FeelingSymptom" AS ENUM ('MILD_NAUSEA', 'LIMB_TINGLING', 'DRY_MOUTH', 'JOINT_PAIN');

-- CreateEnum
CREATE TYPE "SymptomPattern" AS ENUM ('CONTINUOUS', 'INTERMITTENT');

-- CreateEnum
CREATE TYPE "SymptomOnset" AS ENUM ('THIS_MORNING', 'LAST_NIGHT', 'YESTERDAY', 'FEW_DAYS_AGO', 'CUSTOM_DATE');

-- AlterTable
ALTER TABLE "guardianship" ADD COLUMN     "canViewFeelingLogs" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "feeling_logs" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "energyLevel" SMALLINT NOT NULL,
    "fatigueLevel" SMALLINT NOT NULL,
    "mentalClarity" SMALLINT NOT NULL,
    "moodLevel" SMALLINT NOT NULL,
    "physicalComfort" SMALLINT NOT NULL,
    "symptoms" "FeelingSymptom"[],
    "symptomPattern" "SymptomPattern",
    "symptomOnset" "SymptomOnset" NOT NULL,
    "symptomStartedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feeling_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feeling_logs_patientId_createdAt_idx" ON "feeling_logs"("patientId", "createdAt");

-- AddForeignKey
ALTER TABLE "feeling_logs" ADD CONSTRAINT "feeling_logs_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
