/*
  Warnings:

  - A unique constraint covering the columns `[chatId,userId]` on the table `telegramGroups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "telegramGroups_chatId_userId_key" ON "telegramGroups"("chatId", "userId");
