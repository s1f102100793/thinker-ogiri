/*
  Warnings:

  - The primary key for the `Boke` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Boke` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Boke" DROP CONSTRAINT "Boke_pkey",
DROP COLUMN "id",
ADD COLUMN     "bokeId" SERIAL NOT NULL,
ADD CONSTRAINT "Boke_pkey" PRIMARY KEY ("bokeId");
