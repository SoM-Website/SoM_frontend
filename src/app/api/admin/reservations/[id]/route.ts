import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const ALLOWED = new Set(["pending", "confirmed", "completed", "cancelled"]);

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
  }

  const body = await request.json();
  const status = String(body?.status ?? "");

  if (!ALLOWED.has(status)) {
    return NextResponse.json({ error: "유효하지 않은 상태입니다." }, { status: 400 });
  }

  const updated = await prisma.reservation.update({
    where: { id },
    data: { status },
  });

  const { password, ...sanitized } = updated;
  return NextResponse.json(sanitized);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
  }

  await prisma.reservation.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
