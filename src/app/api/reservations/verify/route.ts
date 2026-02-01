// src/app/api/reservations/verify/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, password } = body

    if (!name || !password) {
      return NextResponse.json(
        { error: '이름과 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이름으로 예약 찾기
    const reservations = await prisma.reservation.findMany({
      where: { name },
      orderBy: { createdAt: 'desc' },
    })

    if (reservations.length === 0) {
      return NextResponse.json(
        { error: '해당 이름으로 신청된 내역이 없습니다.' },
        { status: 404 }
      )
    }

    // 비밀번호 확인 (첫 번째 예약의 비밀번호로 확인)
    const isValid = await bcrypt.compare(password, reservations[0].password)

    if (!isValid) {
      return NextResponse.json(
        { error: '비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      )
    }

    // 비밀번호 제외하고 반환
    const sanitizedReservations = reservations.map(({ password, ...rest }) => rest)

    return NextResponse.json({ reservations: sanitizedReservations })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: '인증 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}