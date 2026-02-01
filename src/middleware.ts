// src/middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";  // 가벼운 설정만 import

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/education/write/:path*",
  ],
};