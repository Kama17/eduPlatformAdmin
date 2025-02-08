-- DropForeignKey
ALTER TABLE "telegramGroups" DROP CONSTRAINT "telegramGroups_chatId_fkey";

-- AddForeignKey
ALTER TABLE "telegramGroups" ADD CONSTRAINT "telegramGroups_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "bot"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;
