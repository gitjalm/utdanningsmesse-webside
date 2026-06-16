/*
  Warnings:

  - You are about to drop the column `news_id` on the `Video` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_news_id_fkey";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "news_id";
