-- CreateTable
CREATE TABLE "UserProfile" (
    "userId" TEXT NOT NULL,
    "mailaddress" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "totallike" INTEGER NOT NULL,
    "otherUserLike" JSONB NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId")
);
