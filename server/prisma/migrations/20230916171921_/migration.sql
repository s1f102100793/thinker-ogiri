/*
  Warnings:

  - The primary key for the `Boke` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Boke` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Boke" DROP CONSTRAINT "Boke_pkey",
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Boke_pkey" PRIMARY KEY ("id");
