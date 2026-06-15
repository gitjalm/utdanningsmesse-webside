-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UTKAST', 'PUBLISERT', 'ARKIVERT');

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UTKAST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "offer_id" TEXT,
    "news_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("id") ON DELETE SET NULL ON UPDATE CASCADE;
