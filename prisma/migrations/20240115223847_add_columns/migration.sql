/*
  Warnings:

  - Added the required column `periodEnd` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodStart` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('trialing', 'active', 'incomplete', 'incomplete_expired', 'past_due', 'canceled', 'unpaid', 'paused');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "periodEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "periodStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'incomplete';

-- AlterTable
ALTER TABLE "SubscriptionSchedule" ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'incomplete';

-- CreateTable
CREATE TABLE "Phase" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);
