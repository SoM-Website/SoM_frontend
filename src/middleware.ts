// src/middleware.ts
import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl
  
  const isLoginPage = pathname === "/admin/login"
  
  if (isLoginPage) {
    return
  }
  
  const isAdminRoute = pathname.startsWith("/admin")
  
  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", req.url))
  }
})

export const config = {
  matcher: [
    "/admin/:path*", 
    "/api/admin/:path*"
    // ✅ /education 관련 제거 - /education/write 페이지 자체에서 체크
  ],
}