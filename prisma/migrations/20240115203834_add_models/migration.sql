-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('usd', 'aed', 'afn', 'all', 'aud', 'php', 'pln');

-- CreateEnum
CREATE TYPE "EndBehavior" AS ENUM ('cancel', 'release');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'usd',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "unit_amount" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionSchedule" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_behavior" "EndBehavior" NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "SubscriptionSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" SERIAL NOT NULL,
    "iterations" INTEGER NOT NULL,
    "subscription_schedule_id" TEXT NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhaseItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_id" TEXT NOT NULL,
    "phaseId" INTEGER NOT NULL,

    CONSTRAINT "PhaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_id" TEXT NOT NULL,

    CONSTRAINT "SubscriptionItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionSchedule" ADD CONSTRAINT "SubscriptionSchedule_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_subscription_schedule_id_fkey" FOREIGN KEY ("subscription_schedule_id") REFERENCES "SubscriptionSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhaseItem" ADD CONSTRAINT "PhaseItem_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhaseItem" ADD CONSTRAINT "PhaseItem_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionItem" ADD CONSTRAINT "SubscriptionItem_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
