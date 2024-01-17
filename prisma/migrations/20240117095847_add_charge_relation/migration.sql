/*
  Warnings:

  - Added the required column `subscription_id` to the `Charge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "subscription_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
