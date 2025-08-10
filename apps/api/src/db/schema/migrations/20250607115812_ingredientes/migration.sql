-- CreateEnum
CREATE TYPE "Effects" AS ENUM ('GOOD', 'BAD');

-- CreateTable
CREATE TABLE "ingredientEffect" (
    "id" SERIAL NOT NULL,
    "ingredientsId" INTEGER NOT NULL,
    "skinTypeId" INTEGER NOT NULL,
    "Effect" "Effects" NOT NULL,

    CONSTRAINT "ingredientEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredientEffect" ADD CONSTRAINT "ingredientEffect_ingredientsId_fkey" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientEffect" ADD CONSTRAINT "ingredientEffect_skinTypeId_fkey" FOREIGN KEY ("skinTypeId") REFERENCES "skinType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
