/*
  Warnings:

  - You are about to drop the `Phase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhaseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Phase" DROP CONSTRAINT "Phase_subscription_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "PhaseItem" DROP CONSTRAINT "PhaseItem_phaseId_fkey";

-- DropForeignKey
ALTER TABLE "PhaseItem" DROP CONSTRAINT "PhaseItem_price_id_fkey";

-- DropTable
DROP TABLE "Phase";

-- DropTable
DROP TABLE "PhaseItem";
