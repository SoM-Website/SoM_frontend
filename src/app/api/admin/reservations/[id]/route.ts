// // src/app/api/admin/reservations/[id]/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";

// const ALLOWED = new Set(["pending", "confirmed", "completed", "cancelled"]);

// function requireAdmin(session: Awaited<ReturnType<typeof auth>>) {
//   if (!session || session.user?.role !== "ADMIN") {
//     return null;
//   }
//   return session;
// }

// export async function PATCH(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await auth();
//   if (!requireAdmin(session)) {
//     return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
//   }

//   const id = Number(params.id);
//   if (!Number.isFinite(id) || id <= 0) {
//     return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
//   }

//   const body: unknown = await request.json();
//   const nextStatus =
//     typeof body === "object" && body !== null && "status" in body
//       ? String((body as { status?: unknown }).status ?? "")
//       : "";

//   if (!ALLOWED.has(nextStatus)) {
//     return NextResponse.json(
//       { error: "유효하지 않은 상태입니다." },
//       { status: 400 }
//     );
//   }

//   const updated = await prisma.reservation.update({
//     where: { id },
//     data: { status: nextStatus },
//   });

//   // password 필드 제외
//   const { password: _password, ...sanitized } = updated;
//   void _password;
//   return NextResponse.json(sanitized);
// }

// export async function DELETE(
//   _request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await auth();
//   if (!requireAdmin(session)) {
//     return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
//   }

//   const id = Number(params.id);
//   if (!Number.isFinite(id) || id <= 0) {
//     return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
//   }

//   await prisma.reservation.delete({
//     where: { id },
//   });

//   return NextResponse.json({ ok: true });
// }



// src/app/api/admin/reservations/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { Session } from "next-auth";  // 상단에 추가

const ALLOWED = new Set(["pending", "confirmed", "completed", "cancelled"]);

function requireAdmin(session: Session | null){
  if (!session || session.user?.role !== "ADMIN") return null;
  return session;
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, ctx: RouteContext) {
  const session = await auth();
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const { id: idParam } = await ctx.params;
  const id = Number(idParam);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
  }

  const body: unknown = await request.json();
  const nextStatus =
    typeof body === "object" && body !== null && "status" in body
      ? String((body as { status?: unknown }).status ?? "")
      : "";

  if (!ALLOWED.has(nextStatus)) {
    return NextResponse.json({ error: "유효하지 않은 상태입니다." }, { status: 400 });
  }

  const updated = await prisma.reservation.update({
    where: { id },
    data: { status: nextStatus },
  });

  const { password: _password, ...sanitized } = updated;
  void _password;
  return NextResponse.json(sanitized);
}

export async function DELETE(_request: Request, ctx: RouteContext) {
  const session = await auth();
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const { id: idParam } = await ctx.params;
  const id = Number(idParam);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "잘못된 id 입니다." }, { status: 400 });
  }

  await prisma.reservation.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
