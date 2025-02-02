/*
  Warnings:

  - A unique constraint covering the columns `[telegramId]` on the table `userDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userDetails_telegramId_key" ON "userDetails"("telegramId");
