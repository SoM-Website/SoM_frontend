// src/app/api/reservations/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, name, phone, password, email, title, content } = body

    // 필수 필드 검증
    if (!type || !name || !phone || !password || !email) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    // 전화번호 형식 검증
    if (phone.length < 10 || phone.length > 11 || !/^\d+$/.test(phone)) {
      return NextResponse.json(
        { error: '올바른 전화번호 형식이 아닙니다.' },
        { status: 400 }
      )
    }

    // 비밀번호 최소 길이 검증
    if (password.length < 4) {
      return NextResponse.json(
        { error: '비밀번호는 최소 4자리 이상이어야 합니다.' },
        { status: 400 }
      )
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10)

    // 데이터베이스에 저장
    const reservation = await prisma.reservation.create({
      data: {
        type,
        name,
        phone,
        password: hashedPassword,
        email,
        title: title || null,
        content: content || null,
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: '상담 신청이 완료되었습니다.',
        id: reservation.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Reservation creation error:', error)
    return NextResponse.json(
      { error: '상담 신청 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}