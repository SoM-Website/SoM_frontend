// src/app/api/reservations/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        name: true,
        phone: true,
        email: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!reservation) {
      return NextResponse.json(
        { error: '예약 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(reservation)
  } catch (error) {
    console.error('Get reservation error:', error)
    return NextResponse.json(
      { error: '조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 수정
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { type, phone, email, title, content, password } = body

    // 비밀번호 확인
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    })

    if (!reservation) {
      return NextResponse.json(
        { error: '예약 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const isValid = await bcrypt.compare(password, reservation.password)
    if (!isValid) {
      return NextResponse.json(
        { error: '비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      )
    }

    // 수정
    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        type,
        phone,
        email,
        title: title || null,
        content: content || null,
      },
      select: {
        id: true,
        type: true,
        name: true,
        phone: true,
        email: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update reservation error:', error)
    return NextResponse.json(
      { error: '수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { password } = body

    // 비밀번호 확인
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    })

    if (!reservation) {
      return NextResponse.json(
        { error: '예약 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const isValid = await bcrypt.compare(password, reservation.password)
    if (!isValid) {
      return NextResponse.json(
        { error: '비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      )
    }

    // 삭제
    await prisma.reservation.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete reservation error:', error)
    return NextResponse.json(
      { error: '삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}