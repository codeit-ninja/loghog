/*
  Warnings:

  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_LogId_fkey";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "Logs";

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "LogId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logs_name_key" ON "logs"("name");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_LogId_fkey" FOREIGN KEY ("LogId") REFERENCES "logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
