// src/middleware.ts
import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl
  
  // 로그인 페이지는 체크 제외
  const isLoginPage = pathname === "/admin/login"
  
  if (isLoginPage) {
    return
  }
  
  const isAdminRoute = pathname.startsWith("/admin")
  const isEducationWriteRoute = pathname.startsWith("/education/write") // ✅ 추가
  
  // /admin과 /education/write만 로그인 필요
  if ((isAdminRoute || isEducationWriteRoute) && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", req.url))
  }
})

export const config = {
  matcher: [
    "/admin/:path*", 
    "/api/admin/:path*", 
    "/education/write/:path*" // ✅ 변경: /education/write만 보호
  ],
}