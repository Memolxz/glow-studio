-- CreateTable
CREATE TABLE "skinType" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "skinType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userToDelete" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userToDelete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userSkinType" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "skinTypeId" INTEGER NOT NULL,

    CONSTRAINT "userSkinType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "userToDelete" ADD CONSTRAINT "userToDelete_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userSkinType" ADD CONSTRAINT "userSkinType_skinTypeId_skinType_id_fk" FOREIGN KEY ("skinTypeId") REFERENCES "skinType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userSkinType" ADD CONSTRAINT "userSkinType_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
