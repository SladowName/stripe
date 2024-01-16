-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('standard', 'express', 'custom');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charge" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "Charge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
