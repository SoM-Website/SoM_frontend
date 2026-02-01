// src/app/admin/login/page.tsx
import { auth } from "src/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "src/components/LoginForm"; // 로그인 폼 컴포넌트

export default async function AdminLoginPage() {
  const session = await auth();

  // ✅ 이미 로그인되어 있으면 대시보드로
  if (session?.user?.role === "ADMIN") {
    redirect("/");
  }

  // ✅ 로그인 안 되어 있으면 로그인 폼 표시
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
        <LoginForm />
      </div>
    </div>
  );
}