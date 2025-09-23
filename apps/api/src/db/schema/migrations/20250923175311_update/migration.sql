/*
  Warnings:

  - You are about to drop the `ingredientEffect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recommendation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skinType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userSkinType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductCategoryType" AS ENUM ('SERUM', 'CREAM', 'CLEANSER', 'TONER', 'SUNSCREEN', 'MASK', 'MOISTURIZER', 'EXFOLIANT', 'ESSENCE', 'TREATMENT');

-- DropForeignKey
ALTER TABLE "ingredientEffect" DROP CONSTRAINT "ingredientEffect_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredientEffect" DROP CONSTRAINT "ingredientEffect_skinTypeId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "productIngredient" DROP CONSTRAINT "productIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "productIngredient" DROP CONSTRAINT "productIngredient_productId_fkey";

-- DropForeignKey
ALTER TABLE "recommendation" DROP CONSTRAINT "recommendation_productId_fkey";

-- DropForeignKey
ALTER TABLE "recommendation" DROP CONSTRAINT "recommendation_userId_fkey";

-- DropForeignKey
ALTER TABLE "userSkinType" DROP CONSTRAINT "userSkinType_skinTypeId_fkey";

-- DropForeignKey
ALTER TABLE "userSkinType" DROP CONSTRAINT "userSkinType_userId_fkey";

-- DropTable
DROP TABLE "ingredientEffect";

-- DropTable
DROP TABLE "ingredients";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "productCategory";

-- DropTable
DROP TABLE "productIngredient";

-- DropTable
DROP TABLE "recommendation";

-- DropTable
DROP TABLE "skinType";

-- DropTable
DROP TABLE "userSkinType";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "productCategoryType";

-- CreateTable
CREATE TABLE "IngredientEffect" (
    "ingredientId" INTEGER NOT NULL,
    "skinTypeId" INTEGER NOT NULL,
    "Effect" "Effects" NOT NULL,

    CONSTRAINT "IngredientEffect_pkey" PRIMARY KEY ("ingredientId","skinTypeId")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "officialUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "price" DECIMAL(65,30),
    "category" "ProductCategoryType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIngredient" (
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("productId","ingredientId")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationIngredient" (
    "recommendationId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "RecommendationIngredient_pkey" PRIMARY KEY ("recommendationId","ingredientId")
);

-- CreateTable
CREATE TABLE "SkinType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SkinType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSkinType" (
    "userId" INTEGER NOT NULL,
    "skinTypeId" INTEGER NOT NULL,

    CONSTRAINT "UserSkinType_pkey" PRIMARY KEY ("userId","skinTypeId")
);

-- CreateIndex
CREATE INDEX "ProductIngredient_ingredientId_idx" ON "ProductIngredient"("ingredientId");

-- CreateIndex
CREATE INDEX "Recommendation_userId_idx" ON "Recommendation"("userId");

-- CreateIndex
CREATE INDEX "Recommendation_productId_idx" ON "Recommendation"("productId");

-- CreateIndex
CREATE INDEX "RecommendationIngredient_recommendationId_idx" ON "RecommendationIngredient"("recommendationId");

-- CreateIndex
CREATE INDEX "RecommendationIngredient_ingredientId_idx" ON "RecommendationIngredient"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "IngredientEffect" ADD CONSTRAINT "IngredientEffect_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientEffect" ADD CONSTRAINT "IngredientEffect_skinTypeId_fkey" FOREIGN KEY ("skinTypeId") REFERENCES "SkinType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationIngredient" ADD CONSTRAINT "RecommendationIngredient_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "Recommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationIngredient" ADD CONSTRAINT "RecommendationIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkinType" ADD CONSTRAINT "UserSkinType_skinTypeId_fkey" FOREIGN KEY ("skinTypeId") REFERENCES "SkinType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkinType" ADD CONSTRAINT "UserSkinType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
