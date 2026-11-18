/*
  Warnings:

  - You are about to drop the `GuardianPatient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GuardianPatient" DROP CONSTRAINT "GuardianPatient_guardianId_fkey";

-- DropForeignKey
ALTER TABLE "GuardianPatient" DROP CONSTRAINT "GuardianPatient_patientId_fkey";

-- DropTable
DROP TABLE "GuardianPatient";

-- CreateTable
CREATE TABLE "guardianship" (
    "id" UUID NOT NULL,
    "relationship" "GuardianRelationship",
    "linkStatus" "GuardianLinkStatus" NOT NULL DEFAULT 'PENDING',
    "canViewMedicalInfo" BOOLEAN NOT NULL DEFAULT false,
    "canManageAppointments" BOOLEAN NOT NULL DEFAULT false,
    "canManageMedications" BOOLEAN NOT NULL DEFAULT false,
    "receivesNotifications" BOOLEAN NOT NULL DEFAULT true,
    "guardianId" UUID NOT NULL,
    "patientId" UUID NOT NULL,

    CONSTRAINT "guardianship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guardianship_guardianId_patientId_key" ON "guardianship"("guardianId", "patientId");

-- AddForeignKey
ALTER TABLE "guardianship" ADD CONSTRAINT "guardianship_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "guardians"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardianship" ADD CONSTRAINT "guardianship_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
