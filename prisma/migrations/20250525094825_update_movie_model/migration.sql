/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_movie_actors" DROP CONSTRAINT "_movie_actors_B_fkey";

-- DropForeignKey
ALTER TABLE "_movie_genres" DROP CONSTRAINT "_movie_genres_B_fkey";

-- DropForeignKey
ALTER TABLE "_user_favorites" DROP CONSTRAINT "_user_favorites_A_fkey";

-- DropTable
DROP TABLE "Movie";

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "big_poster" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_slug_key" ON "movie"("slug");

-- AddForeignKey
ALTER TABLE "_movie_genres" ADD CONSTRAINT "_movie_genres_B_fkey" FOREIGN KEY ("B") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_movie_actors" ADD CONSTRAINT "_movie_actors_B_fkey" FOREIGN KEY ("B") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_favorites" ADD CONSTRAINT "_user_favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
