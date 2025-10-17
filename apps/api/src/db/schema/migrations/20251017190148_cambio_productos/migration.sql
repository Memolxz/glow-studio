/*
  Warnings:

  - The values [SUNSCREEN,MASK,MOISTURIZER,TREATMENT] on the enum `ProductCategoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "BodyPart" AS ENUM ('FACE', 'EYES', 'NECK', 'BODY');

-- AlterEnum
BEGIN;
CREATE TYPE "ProductCategoryType_new" AS ENUM ('FACE_CREAM', 'MIST_ESSENCE', 'NIGHT_CREAM', 'NECK_CREAM', 'BB_CC_CREAM', 'FACE_OIL', 'CLEANSER', 'EXFOLIANT', 'MAKEUP_REMOVER', 'FACE_WIPE', 'TONER', 'SERUM', 'ACNE_TREATMENT', 'FACIAL_PEEL', 'FACE_MASK', 'SHEET_MASK', 'EYE_MASK', 'EYE_CREAM', 'FACE_SUNSCREEN', 'BODY_SUNSCREEN');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "ProductCategoryType_new" USING ("category"::text::"ProductCategoryType_new");
ALTER TYPE "ProductCategoryType" RENAME TO "ProductCategoryType_old";
ALTER TYPE "ProductCategoryType_new" RENAME TO "ProductCategoryType";
DROP TYPE "ProductCategoryType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "bodyPart" "BodyPart" NOT NULL DEFAULT 'FACE',
ADD COLUMN     "sephoraCategoryId" TEXT;
