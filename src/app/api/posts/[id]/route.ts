// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/posts/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }  // ✅ Next.js가 자동으로 params 제공
) {
  const id = parseInt(params.id)
  if (!id || id <= 0) {
    return NextResponse.json({ message: '잘못된 ID' }, { status: 400 })
  }

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) {
    return NextResponse.json({ message: '존재하지 않는 글' }, { status: 404 })
  }
  return NextResponse.json(post)
}

// DELETE /api/posts/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  if (!id || id <= 0) {
    return NextResponse.json({ message: '잘못된 ID' }, { status: 400 })
  }

  await prisma.post.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

// PUT은 필요하면 그대로 유지