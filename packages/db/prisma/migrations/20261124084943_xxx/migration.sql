/*
  Warnings:

  - You are about to drop the column `canManageAppointments` on the `guardianship` table. All the data in the column will be lost.
  - You are about to drop the column `canManageMedications` on the `guardianship` table. All the data in the column will be lost.
  - You are about to drop the column `receivesNotifications` on the `guardianship` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CalendarType" AS ENUM ('DOCTOR_APPOINTMENT', 'CHECKUP', 'CHEMOTHERAPY');

-- AlterTable
ALTER TABLE "guardianship" DROP COLUMN "canManageAppointments",
DROP COLUMN "canManageMedications",
DROP COLUMN "receivesNotifications",
ADD COLUMN     "canReceiveNotifications" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canViewAppointments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canViewMedications" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "calendar" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "CalendarType" NOT NULL DEFAULT 'DOCTOR_APPOINTMENT',
    "doctorName" TEXT,
    "clinicName" TEXT,
    "patientId" UUID NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
