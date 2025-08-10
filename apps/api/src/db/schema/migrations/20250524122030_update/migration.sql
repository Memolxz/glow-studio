/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `userToDelete` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `userToDelete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `userToDelete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `userToDelete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `userToDelete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `userToDelete` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userToDelete" DROP CONSTRAINT "userToDelete_userId_users_id_fk";

-- AlterTable
ALTER TABLE "userToDelete" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_to_delete_email_unique" ON "userToDelete"("email");
