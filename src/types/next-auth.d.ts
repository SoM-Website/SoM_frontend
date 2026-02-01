// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "USER" | "ADMIN"  // ✅ string → "USER" | "ADMIN"
    } & DefaultSession["user"]
  }

  interface User {
    id: string              // ✅ id 추가
    role: "USER" | "ADMIN"  // ✅ string → "USER" | "ADMIN"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "USER" | "ADMIN"  // ✅ string → "USER" | "ADMIN"
  }
}