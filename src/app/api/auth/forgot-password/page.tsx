"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm p-8 border rounded-xl shadow">
        <h1 className="text-xl font-bold mb-6">비밀번호 찾기</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="등록된 이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded py-2"
          >
            {loading ? "발송 중..." : "재설정 링크 받기"}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
        <a href="/admin/login" className="mt-4 block text-sm text-center text-gray-400">
          로그인으로 돌아가기
        </a>
      </div>
    </div>
  );
}