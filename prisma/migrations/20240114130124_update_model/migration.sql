/*
  Warnings:

  - You are about to drop the column `itemName` on the `ZakatItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ZakatItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `ZakatItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ZakatItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `ZakatItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `ZakatItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ZakatItem_itemName_key";

-- AlterTable
ALTER TABLE "ZakatItem" DROP COLUMN "itemName",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nisab_threshold" TEXT,
ADD COLUMN     "rate" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updatedById" INTEGER NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "updatedById" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZakatItem_name_key" ON "ZakatItem"("name");

-- AddForeignKey
ALTER TABLE "ZakatItem" ADD CONSTRAINT "ZakatItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZakatItem" ADD CONSTRAINT "ZakatItem_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
