-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "ident_document" TEXT NOT NULL,
    "birth_name" TIMESTAMP(3),
    "street_name" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "complements" TEXT,
    "district" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
