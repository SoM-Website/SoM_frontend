// src/lib/auth.config.ts
import type { NextAuthConfig } from "next-auth";

// Middleware용 가벼운 설정 (Prisma, bcryptjs 없음)
export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/login" },
  
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      
      const isLoginPage = pathname === "/admin/login";
      if (isLoginPage) return true;
      
      const isAdminRoute = pathname.startsWith("/admin");
      const isEducationWriteRoute = pathname.startsWith("/education/write");
      
      if (isAdminRoute || isEducationWriteRoute) {
        return isLoggedIn; // false면 자동으로 signIn 페이지로 리다이렉트
      }
      
      return true;
    },
  },
  
  providers: [], // Middleware에서는 provider 불필요
};