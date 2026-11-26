-- CreateEnum
CREATE TYPE "NotificationSeverity" AS ENUM ('INFO', 'SUCCESS', 'ERROR');

-- CreateEnum
CREATE TYPE "NotificationKind" AS ENUM ('CHAT', 'APPOINTMENT');

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "kind" "NotificationKind" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "params" JSONB NOT NULL,
    "severity" "NotificationSeverity" NOT NULL DEFAULT 'INFO',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_profileId_createdAt_idx" ON "notifications"("profileId", "createdAt");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
