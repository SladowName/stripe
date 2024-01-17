/*
  Warnings:

  - Added the required column `status` to the `Charge` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChargeStatus" AS ENUM ('succeeded', 'pending', 'failed');

-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "status" "ChargeStatus" NOT NULL;
