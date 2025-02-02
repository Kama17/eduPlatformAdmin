/*
  Warnings:

  - You are about to drop the column `groupId` on the `telegramGroups` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `telegramGroups` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `telegramGroups` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "telegramGroups_groupId_key";

-- AlterTable
ALTER TABLE "telegramGroups" DROP COLUMN "groupId",
DROP COLUMN "groupName",
ADD COLUMN     "chatId" BIGINT NOT NULL,
ADD COLUMN     "chatName" TEXT;

-- AddForeignKey
ALTER TABLE "telegramGroups" ADD CONSTRAINT "telegramGroups_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "bot"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;
