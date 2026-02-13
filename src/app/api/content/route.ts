// src/app/api/content/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: 특정 키의 콘텐츠 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Key required' }, { status: 400 });
  }

  try {
    const content = await prisma.content.findUnique({
      where: { key }
    });

    return NextResponse.json(content || { key, value: '' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

// PUT: 콘텐츠 저장/수정
export async function PUT(request: Request) {
  const session = await auth();
  
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { key, value } = await request.json();

    const content = await prisma.content.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}