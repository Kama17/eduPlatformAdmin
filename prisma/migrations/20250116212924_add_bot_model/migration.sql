-- CreateTable
CREATE TABLE "bot" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "chatName" TEXT NOT NULL,
    "isMember" BOOLEAN NOT NULL,

    CONSTRAINT "bot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bot_chatId_key" ON "bot"("chatId");
