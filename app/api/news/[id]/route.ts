import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const news = await db.news.findUnique({
    where: { id },
  });

  if (!news) {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }

  return NextResponse.json(news);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const news = await db.news.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
      category: body.category,
      image_url: body.image_url,
      status: body.status,
    },
  });

  return NextResponse.json(news);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await db.news.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
