/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `logs` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `logs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "logs" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "logs_slug_key" ON "logs"("slug");
