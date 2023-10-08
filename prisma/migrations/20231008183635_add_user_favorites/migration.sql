-- CreateEnum
CREATE TYPE "media_type" AS ENUM ('TVSHOW', 'MOVIE');

-- CreateTable
CREATE TABLE "user_favs" (
    "tmdbId" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "media_type " "media_type" NOT NULL,

    CONSTRAINT "user_favs_pkey" PRIMARY KEY ("tmdbId","user_id","media_type ")
);

-- AddForeignKey
ALTER TABLE "user_favs" ADD CONSTRAINT "user_favs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
