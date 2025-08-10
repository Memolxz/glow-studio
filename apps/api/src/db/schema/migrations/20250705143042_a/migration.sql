/*
  Warnings:

  - Changed the type of `name` on the `productCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "productCategoryType" AS ENUM ('SERUM', 'CREAM', 'CLEANSER', 'TONER', 'SUNSCREEN', 'MASK', 'MOISTURIZER', 'EXFOLIANT', 'ESSENCE', 'TREATMENT');

-- AlterTable
ALTER TABLE "productCategory" DROP COLUMN "name",
ADD COLUMN     "name" "productCategoryType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "productCategory_name_key" ON "productCategory"("name");
