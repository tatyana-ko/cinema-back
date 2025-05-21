/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `genre` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "genre_slug_key" ON "genre"("slug");
