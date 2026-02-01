// src/app/api/admin/reservations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  // password 필드 제외
  // const sanitized = reservations.map(({ password: _password, ...rest }) => rest);
  const sanitized = reservations.map(({ password: _password, ...rest }) => {
  void _password
  return rest
})


  return NextResponse.json({ reservations: sanitized });
}
