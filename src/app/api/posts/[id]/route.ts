// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/posts/:id
export async function GET(_req: NextRequest, ctx: RouteContext) {
  const { id: idParam } = await ctx.params;
  const id = Number(idParam);

  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ message: "잘못된 ID" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ message: "존재하지 않는 글" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// DELETE /api/posts/:id
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const { id: idParam } = await ctx.params;
  const id = Number(idParam);

  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ message: "잘못된 ID" }, { status: 400 });
  }

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
