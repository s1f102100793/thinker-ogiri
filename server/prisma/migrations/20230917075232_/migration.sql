/*
  Warnings:

  - You are about to drop the column `likeCount` on the `Boke` table. All the data in the column will be lost.
  - Added the required column `like` to the `Boke` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boke" DROP COLUMN "likeCount",
ADD COLUMN     "like" INTEGER NOT NULL;
