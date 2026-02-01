// src/app/api/reservations/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function parsePositiveInt(value: string): number | null {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

// 조회
export async function GET(_request: Request, ctx: RouteContext) {
  try {
    const { id: idParam } = await ctx.params;
    const id = parsePositiveInt(idParam);
    if (id === null) {
      return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
    }

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
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "예약 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Get reservation error:", error);
    return NextResponse.json(
      { error: "조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 수정
export async function PUT(request: Request, ctx: RouteContext) {
  try {
    const { id: idParam } = await ctx.params;
    const id = parsePositiveInt(idParam);
    if (id === null) {
      return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
    }

    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "요청 본문이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    const { type, phone, email, title, content, password } = body as {
      type?: unknown;
      phone?: unknown;
      email?: unknown;
      title?: unknown;
      content?: unknown;
      password?: unknown;
    };

    if (typeof password !== "string" || password.length === 0) {
      return NextResponse.json(
        { error: "비밀번호가 필요합니다." },
        { status: 400 }
      );
    }

    // 비밀번호 확인
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "예약 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, reservation.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // 수정
    const updated = await prisma.reservation.update({
      where: { id },
      data: {
        type: typeof type === "string" ? type : undefined,
        phone: typeof phone === "string" ? phone : undefined,
        email: typeof email === "string" ? email : undefined,
        title: typeof title === "string" && title.length > 0 ? title : null,
        content:
          typeof content === "string" && content.length > 0 ? content : null,
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
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update reservation error:", error);
    return NextResponse.json(
      { error: "수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 삭제
export async function DELETE(request: Request, ctx: RouteContext) {
  try {
    const { id: idParam } = await ctx.params;
    const id = parsePositiveInt(idParam);
    if (id === null) {
      return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
    }

    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "요청 본문이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    const { password } = body as { password?: unknown };
    if (typeof password !== "string" || password.length === 0) {
      return NextResponse.json(
        { error: "비밀번호가 필요합니다." },
        { status: 400 }
      );
    }

    // 비밀번호 확인
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "예약 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, reservation.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // 삭제
    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete reservation error:", error);
    return NextResponse.json(
      { error: "삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
