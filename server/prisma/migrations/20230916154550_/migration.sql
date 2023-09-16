-- CreateTable
CREATE TABLE "Boke" (
    "createdAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Boke_pkey" PRIMARY KEY ("id")
);
