/*
  Warnings:

  - You are about to drop the column `birth_name` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "birth_name",
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'João das Couves';

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "year_manufacture" INTEGER NOT NULL,
    "imported" BOOLEAN NOT NULL,
    "plates" TEXT NOT NULL,
    "selling_date" TIMESTAMP(3),
    "selling_price" DECIMAL(65,30),

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
