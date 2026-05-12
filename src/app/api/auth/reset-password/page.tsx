"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setMessage(data.message);
    setLoading(false);
    if (res.ok) setTimeout(() => router.push("/admin/login"), 2000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm p-8 border rounded-xl shadow">
        <h1 className="text-xl font-bold mb-6">새 비밀번호 설정</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
            minLength={8}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded py-2"
          >
            {loading ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}