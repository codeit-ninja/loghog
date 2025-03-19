/*
  Warnings:

  - You are about to drop the column `LogId` on the `events` table. All the data in the column will be lost.
  - Added the required column `logId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_LogId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "LogId",
ADD COLUMN     "logId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_logId_fkey" FOREIGN KEY ("logId") REFERENCES "logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
