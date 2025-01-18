/*
  Warnings:

  - You are about to drop the column `back` on the `feeling` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feeling" DROP COLUMN "back";

-- CreateTable
CREATE TABLE "logins" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logins_pkey" PRIMARY KEY ("id")
);
