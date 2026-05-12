// src/lib/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/login" },
  
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      
      const isLoginPage = pathname === "/admin/login";
      const isPublicPage = pathname === "/forgot-password" || pathname.startsWith("/reset-password");
      if (isLoginPage || isPublicPage) return true;  // ← 여기 추가
      
      const isAdminRoute = pathname.startsWith("/admin");
      const isEducationWriteRoute = pathname.startsWith("/education/write");
      
      if (isAdminRoute || isEducationWriteRoute) {
        return isLoggedIn;
      }
      
      return true;
    },
  },
  
  providers: [],
};