-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "invId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Не оплачено',
    "amount" DOUBLE PRECISION NOT NULL,
    "citizenship" TEXT NOT NULL,
    "vizaType" TEXT NOT NULL,
    "peoples" TEXT NOT NULL,
    "firstStepPrice" TEXT NOT NULL,
    "vizaTypeTwo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferredContact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "tourType" TEXT NOT NULL,
    "visaType" TEXT NOT NULL,
    "visaTypeTwo" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportExpiryDate" TIMESTAMP(3) NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "exitDate" TIMESTAMP(3) NOT NULL,
    "citizenship" TEXT NOT NULL,
    "tripPurpose" TEXT NOT NULL,
    "itinerary" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "visaTime" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_invId_key" ON "Order"("invId");

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
