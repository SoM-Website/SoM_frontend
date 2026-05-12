import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { passwordResetToken: token } });

  if (!user || !user.passwordResetExpiry || user.passwordResetExpiry < new Date()) {
    return NextResponse.json({ message: "링크가 유효하지 않거나 만료되었습니다." }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hash,
      passwordResetToken: null,
      passwordResetExpiry: null,
    },
  });

  return NextResponse.json({ message: "비밀번호가 변경되었습니다." });
}