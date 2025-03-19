-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "LogId" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Logs_name_key" ON "Logs"("name");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_LogId_fkey" FOREIGN KEY ("LogId") REFERENCES "Logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
