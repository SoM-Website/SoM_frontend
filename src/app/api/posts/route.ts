import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json()
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ message: '제목/내용 필수' }, { status: 400 })
    }
    const post = await prisma.post.create({
      data: { title: title.trim(), content: content.trim() },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '서버 오류' }, { status: 500 })
  }
}
