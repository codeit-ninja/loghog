/*
  Warnings:

  - You are about to drop the column `type` on the `tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "type",
ALTER COLUMN "expiresAt" SET DEFAULT (now() + interval '30 days');

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");
