-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET DEFAULT 'user';

-- CreateTable
CREATE TABLE "genre" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);
