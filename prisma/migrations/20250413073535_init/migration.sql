-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Не оплачено',
    "amount" REAL NOT NULL,
    "citizenship" TEXT NOT NULL,
    "vizaType" TEXT NOT NULL,
    "peoples" TEXT NOT NULL,
    "firstStepPrice" TEXT NOT NULL,
    "vizaTypeTwo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferredContact" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "birthDate" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "tourType" TEXT NOT NULL,
    "visaType" TEXT NOT NULL,
    "visaTypeTwo" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "passportExpiryDate" DATETIME NOT NULL,
    "entryDate" DATETIME NOT NULL,
    "exitDate" DATETIME NOT NULL,
    "citizenship" TEXT NOT NULL,
    "tripPurpose" TEXT NOT NULL,
    "itinerary" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "visaTime" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "Applicant_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_invId_key" ON "Order"("invId");
