-- CreateEnum
CREATE TYPE "ChatroomType" AS ENUM ('MEDICAL', 'GUARDIANSHIP', 'ADMIN', 'SUPPORT');

-- CreateTable
CREATE TABLE "ChatroomMember" (
    "chatroomId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "lastReadAt" TIMESTAMP(3),
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatroomMember_pkey" PRIMARY KEY ("chatroomId","profileId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" UUID NOT NULL,
    "chatroomId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chatroom" (
    "id" UUID NOT NULL,
    "type" "ChatroomType" NOT NULL,
    "directKey" TEXT,
    "lastMessageId" UUID,
    "lastMessageAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chatroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatroomMember_profileId_idx" ON "ChatroomMember"("profileId");

-- CreateIndex
CREATE INDEX "Message_chatroomId_createdAt_idx" ON "Message"("chatroomId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Chatroom_directKey_key" ON "Chatroom"("directKey");

-- CreateIndex
CREATE UNIQUE INDEX "Chatroom_lastMessageId_key" ON "Chatroom"("lastMessageId");

-- CreateIndex
CREATE INDEX "Chatroom_lastMessageAt_idx" ON "Chatroom"("lastMessageAt" DESC);

-- AddForeignKey
ALTER TABLE "ChatroomMember" ADD CONSTRAINT "ChatroomMember_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomMember" ADD CONSTRAINT "ChatroomMember_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
