import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// URL에서 마지막 세그먼트를 숫자 ID로 파싱
function getIdFromUrl(req: Request): number | null {
  try {
    const pathname = new URL(req.url).pathname.replace(/\/+$/, '') // 트레일링 슬래시 제거
    const last = pathname.split('/').pop() || ''
    const id = Number(last)
    return Number.isFinite(id) && id > 0 ? id : null
  } catch {
    return null
  }
}

// GET /api/posts/:id
export async function GET(req: Request) {
  const id = getIdFromUrl(req)
  if (!id) return NextResponse.json({ message: '잘못된 ID' }, { status: 400 })

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) return NextResponse.json({ message: '존재하지 않는 글' }, { status: 404 })
  return NextResponse.json(post)
}

// PUT /api/posts/:id
export async function PUT(req: Request) {
  const id = getIdFromUrl(req)
  if (!id) return NextResponse.json({ message: '잘못된 ID' }, { status: 400 })

  const body = await req.json().catch(() => null) as { title?: string; content?: string } | null
  if (!body) return NextResponse.json({ message: '잘못된 입력' }, { status: 400 })

  const data: { title?: string; content?: string } = {}
  if (typeof body.title === 'string' && body.title.trim() !== '') data.title = body.title.trim()
  if (typeof body.content === 'string' && body.content.trim() !== '') data.content = body.content.trim()
  if (!('title' in data) && !('content' in data)) {
    return NextResponse.json({ message: '수정할 항목 없음' }, { status: 400 })
  }

  const updated = await prisma.post.update({ where: { id }, data })
  return NextResponse.json(updated)
}

// DELETE /api/posts/:id
export async function DELETE(req: Request) {
  const id = getIdFromUrl(req)
  if (!id) return NextResponse.json({ message: '잘못된 ID' }, { status: 400 })

  await prisma.post.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
