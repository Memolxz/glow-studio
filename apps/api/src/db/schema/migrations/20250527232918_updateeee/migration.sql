/*
  Warnings:

  - You are about to drop the column `Name` on the `skinType` table. All the data in the column will be lost.
  - The primary key for the `userSkinType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userSkinType` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `skinType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userSkinType" DROP CONSTRAINT "userSkinType_skinTypeId_skinType_id_fk";

-- DropForeignKey
ALTER TABLE "userSkinType" DROP CONSTRAINT "userSkinType_userId_users_id_fk";

-- AlterTable
ALTER TABLE "skinType" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userSkinType" DROP CONSTRAINT "userSkinType_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "userSkinType_pkey" PRIMARY KEY ("userId", "skinTypeId");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "userSkinType" ADD CONSTRAINT "userSkinType_skinTypeId_fkey" FOREIGN KEY ("skinTypeId") REFERENCES "skinType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userSkinType" ADD CONSTRAINT "userSkinType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
