-- DropForeignKey
ALTER TABLE "ProductComment" DROP CONSTRAINT "ProductComment_userId_fkey";

-- AlterTable
ALTER TABLE "ProductComment" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
