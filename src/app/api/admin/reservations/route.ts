import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  const sanitized = reservations.map(({ password, ...rest }) => rest);
  return NextResponse.json({ reservations: sanitized });
}
