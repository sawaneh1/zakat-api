-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" INTEGER NOT NULL,
    "userId" INTEGER,
    "zakatId" INTEGER,
    "donationId" INTEGER,
    "goldInventoryId" INTEGER,
    "silverInventoryId" INTEGER,
    "animalInventoryId" INTEGER,
    "nonMonetaryAssetId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoldInventory" (
    "id" SERIAL NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "estimatedValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "GoldInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SilverInventory" (
    "id" SERIAL NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "estimatedValue" DECIMAL(65,30) NOT NULL,
    "description" TEXT,

    CONSTRAINT "SilverInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalInventory" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "estimatedValue" DECIMAL(65,30) NOT NULL,
    "description" TEXT,

    CONSTRAINT "AnimalInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NonMonetaryAsset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "estimatedValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "NonMonetaryAsset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_zakatId_fkey" FOREIGN KEY ("zakatId") REFERENCES "Zakat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_goldInventoryId_fkey" FOREIGN KEY ("goldInventoryId") REFERENCES "GoldInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_silverInventoryId_fkey" FOREIGN KEY ("silverInventoryId") REFERENCES "SilverInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_animalInventoryId_fkey" FOREIGN KEY ("animalInventoryId") REFERENCES "AnimalInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_nonMonetaryAssetId_fkey" FOREIGN KEY ("nonMonetaryAssetId") REFERENCES "NonMonetaryAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
