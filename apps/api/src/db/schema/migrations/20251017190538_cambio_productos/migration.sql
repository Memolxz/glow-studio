/*
  Warnings:

  - The values [NECK] on the enum `BodyPart` will be removed. If these variants are still used in the database, this will fail.
  - The values [FACE_CREAM,MIST_ESSENCE,NIGHT_CREAM,NECK_CREAM,BB_CC_CREAM,FACE_OIL,MAKEUP_REMOVER,FACE_WIPE,ACNE_TREATMENT,FACIAL_PEEL,FACE_MASK,SHEET_MASK,EYE_MASK,FACE_SUNSCREEN,BODY_SUNSCREEN] on the enum `ProductCategoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BodyPart_new" AS ENUM ('FACE', 'EYES', 'LIPS', 'BODY', 'GENERAL');
ALTER TABLE "Product" ALTER COLUMN "bodyPart" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "bodyPart" TYPE "BodyPart_new" USING ("bodyPart"::text::"BodyPart_new");
ALTER TYPE "BodyPart" RENAME TO "BodyPart_old";
ALTER TYPE "BodyPart_new" RENAME TO "BodyPart";
DROP TYPE "BodyPart_old";
ALTER TABLE "Product" ALTER COLUMN "bodyPart" SET DEFAULT 'FACE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProductCategoryType_new" AS ENUM ('SERUM', 'CLEANSER', 'TONER', 'SUNSCREEN', 'MASK', 'MOISTURIZER', 'EXFOLIANT', 'TREATMENT', 'EYE_CREAM', 'LIP_BALM', 'FACIAL_OIL', 'MIST', 'ESSENCE');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "ProductCategoryType_new" USING ("category"::text::"ProductCategoryType_new");
ALTER TYPE "ProductCategoryType" RENAME TO "ProductCategoryType_old";
ALTER TYPE "ProductCategoryType_new" RENAME TO "ProductCategoryType";
DROP TYPE "ProductCategoryType_old";
COMMIT;
