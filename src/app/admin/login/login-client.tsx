// src/app/admin/login/login-client.tsx
"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginClient({ error }: { error: string | null }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await signIn("credentials", {
      username: String(fd.get("username") ?? ""),
      password: String(fd.get("password") ?? ""),
      callbackUrl: "/",
      redirect: true,
    });
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">관리자 로그인</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="username" type="username" required placeholder="아이디" className="w-full rounded-md border px-3 py-2" autoComplete="username" />
        <input name="password" type="password" required placeholder="비밀번호" className="w-full rounded-md border px-3 py-2" autoComplete="current-password" />
        {error && <p className="text-sm text-red-600">인증에 실패했습니다.</p>}
        <button disabled={loading} className="w-full rounded-md bg-neutral-900 text-white py-2 disabled:opacity-60">
          {loading ? "확인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
