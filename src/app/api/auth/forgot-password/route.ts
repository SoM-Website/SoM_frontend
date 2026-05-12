import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ message: "이메일을 입력해주세요." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });

  // 보안상 유저 없어도 동일 응답
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "재설정 링크를 이메일로 발송했습니다." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1시간

  await prisma.user.update({
    where: { email },
    data: { passwordResetToken: token, passwordResetExpiry: expiry },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "noreply@yourdomain.com", // Resend에서 인증한 도메인으로 변경
    to: email,
    subject: "[SoM] 비밀번호 재설정 링크",
    html: `
      <p>아래 링크를 클릭하여 비밀번호를 재설정하세요.</p>
      <p>링크는 1시간 동안 유효합니다.</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `,
  });

  return NextResponse.json({ message: "재설정 링크를 이메일로 발송했습니다." });
}