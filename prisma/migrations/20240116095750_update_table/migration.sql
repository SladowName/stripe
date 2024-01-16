/*
  Warnings:

  - Added the required column `amount` to the `Charge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Charge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL;
