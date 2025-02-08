/*
  Warnings:

  - You are about to drop the column `isMember` on the `bot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bot" DROP COLUMN "isMember",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
