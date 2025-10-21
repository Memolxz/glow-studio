-- CreateEnum
CREATE TYPE "Effects" AS ENUM ('GOOD', 'BAD');

-- CreateEnum
CREATE TYPE "ProductCategoryType" AS ENUM ('SERUM', 'CLEANSER', 'TONER', 'SUNSCREEN', 'MASK', 'MOISTURIZER', 'EXFOLIANT', 'TREATMENT', 'EYE_CREAM', 'FACIAL_OIL', 'MIST', 'ESSENCE');

-- CreateEnum
CREATE TYPE "BodyPart" AS ENUM ('FACE', 'EYES', 'BODY', 'GENERAL');

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
    "rating" DOUBLE PRECISION,
    "bodyPart" "BodyPart" NOT NULL DEFAULT 'FACE',
    "sephoraCategoryId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIngredient" (
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("productId","ingredientId")
);

-- CreateTable
CREATE TABLE "ProductComment" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductComment_pkey" PRIMARY KEY ("id")
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
    "description" TEXT NOT NULL,

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE INDEX "ProductComment_productId_idx" ON "ProductComment"("productId");

-- CreateIndex
CREATE INDEX "ProductComment_userId_idx" ON "ProductComment"("userId");

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
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationIngredient" ADD CONSTRAINT "RecommendationIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationIngredient" ADD CONSTRAINT "RecommendationIngredient_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "Recommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkinType" ADD CONSTRAINT "UserSkinType_skinTypeId_fkey" FOREIGN KEY ("skinTypeId") REFERENCES "SkinType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkinType" ADD CONSTRAINT "UserSkinType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
