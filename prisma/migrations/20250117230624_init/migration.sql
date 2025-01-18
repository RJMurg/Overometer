-- CreateTable
CREATE TABLE "feeling" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "over" INTEGER NOT NULL,
    "back" INTEGER NOT NULL,
    "message" TEXT,

    CONSTRAINT "feeling_pkey" PRIMARY KEY ("id")
);
