/*
  Warnings:

  - You are about to drop the column `label` on the `logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "label" TEXT;

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "label",
ADD COLUMN     "group" TEXT;
