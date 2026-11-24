-- DropForeignKey
ALTER TABLE "feed_reactions" DROP CONSTRAINT "feed_reactions_feedId_fkey";

-- DropForeignKey
ALTER TABLE "feed_reactions" DROP CONSTRAINT "feed_reactions_profileId_fkey";

-- AddForeignKey
ALTER TABLE "feed_reactions" ADD CONSTRAINT "feed_reactions_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "feeds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feed_reactions" ADD CONSTRAINT "feed_reactions_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
