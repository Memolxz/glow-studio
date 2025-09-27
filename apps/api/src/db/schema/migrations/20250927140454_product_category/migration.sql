/*
  Warnings:

  - The values [CREAM,ESSENCE] on the enum `ProductCategoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductCategoryType_new" AS ENUM ('SERUM', 'CLEANSER', 'TONER', 'SUNSCREEN', 'MASK', 'MOISTURIZER', 'EXFOLIANT', 'TREATMENT');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "ProductCategoryType_new" USING ("category"::text::"ProductCategoryType_new");
ALTER TYPE "ProductCategoryType" RENAME TO "ProductCategoryType_old";
ALTER TYPE "ProductCategoryType_new" RENAME TO "ProductCategoryType";
DROP TYPE "ProductCategoryType_old";
COMMIT;
