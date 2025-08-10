/*
  Warnings:

  - The primary key for the `ingredientEffect` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ingredientEffect` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientsId` on the `ingredientEffect` table. All the data in the column will be lost.
  - Added the required column `ingredientId` to the `ingredientEffect` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredientEffect" DROP CONSTRAINT "ingredientEffect_ingredientsId_fkey";

-- AlterTable
ALTER TABLE "ingredientEffect" DROP CONSTRAINT "ingredientEffect_pkey",
DROP COLUMN "id",
DROP COLUMN "ingredientsId",
ADD COLUMN     "ingredientId" INTEGER NOT NULL,
ADD CONSTRAINT "ingredientEffect_pkey" PRIMARY KEY ("ingredientId", "skinTypeId");

-- AddForeignKey
ALTER TABLE "ingredientEffect" ADD CONSTRAINT "ingredientEffect_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
