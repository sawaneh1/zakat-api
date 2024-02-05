/*
  Warnings:

  - You are about to drop the column `zakatId` on the `ZakatItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ZakatItem" DROP CONSTRAINT "ZakatItem_zakatId_fkey";

-- AlterTable
ALTER TABLE "ZakatItem" DROP COLUMN "zakatId";

-- CreateTable
CREATE TABLE "_ZakatToZakatItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ZakatToZakatItem_AB_unique" ON "_ZakatToZakatItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ZakatToZakatItem_B_index" ON "_ZakatToZakatItem"("B");

-- AddForeignKey
ALTER TABLE "_ZakatToZakatItem" ADD CONSTRAINT "_ZakatToZakatItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Zakat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ZakatToZakatItem" ADD CONSTRAINT "_ZakatToZakatItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ZakatItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
