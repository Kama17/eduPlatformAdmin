-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "active" TEXT NOT NULL DEFAULT 'no',
    "loginCount" INTEGER NOT NULL DEFAULT 0,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userDetails" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "autoShipDate" TIMESTAMP(3),
    "telegramName" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telegramGroups" (
    "id" SERIAL NOT NULL,
    "groupId" TEXT NOT NULL,
    "groupName" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "telegramGroups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "userProgress_userId_itemId_key" ON "userProgress"("userId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "telegramGroups_groupId_key" ON "telegramGroups"("groupId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userDetails" ADD CONSTRAINT "userDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userProgress" ADD CONSTRAINT "userProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telegramGroups" ADD CONSTRAINT "telegramGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
