-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CancerType" ADD VALUE 'SKIN';
ALTER TYPE "CancerType" ADD VALUE 'STOMACH';
ALTER TYPE "CancerType" ADD VALUE 'LIVER';
ALTER TYPE "CancerType" ADD VALUE 'PANCREATIC';
ALTER TYPE "CancerType" ADD VALUE 'ESOPHAGEAL';
ALTER TYPE "CancerType" ADD VALUE 'BLADDER';
ALTER TYPE "CancerType" ADD VALUE 'KIDNEY';
ALTER TYPE "CancerType" ADD VALUE 'OVARIAN';
ALTER TYPE "CancerType" ADD VALUE 'TESTICULAR';
ALTER TYPE "CancerType" ADD VALUE 'HEAD_AND_NECK';
ALTER TYPE "CancerType" ADD VALUE 'MULTIPLE_MYELOMA';
ALTER TYPE "CancerType" ADD VALUE 'SARCOMA';
