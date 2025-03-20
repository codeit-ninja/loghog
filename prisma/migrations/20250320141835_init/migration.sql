-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group" TEXT,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "label" TEXT,
    "timestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "logId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logs_path_key" ON "logs"("path");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_logId_fkey" FOREIGN KEY ("logId") REFERENCES "logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
