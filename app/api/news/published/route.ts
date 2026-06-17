import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const news = await db.news.findMany({
    orderBy: { createdAt: "desc" },
    where: { status: "PUBLISERT" },
  });

  return NextResponse.json(news);
}
