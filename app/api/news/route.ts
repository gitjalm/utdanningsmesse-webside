import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const news = await db.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const body = await req.json();

  const news = await db.news.create({
    data: {
      title: body.title,
      content: body.content,
      category: body.category,
      image_url: body.image_url,
      status: body.status ?? "UTKAST",
    },
  });

  return NextResponse.json(news, { status: 201 });
}
