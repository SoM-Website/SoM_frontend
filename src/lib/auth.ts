// src/lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

type RoleType = "USER" | "ADMIN";

function getRoleFrom(obj: unknown): RoleType | undefined {
  if (obj && typeof obj === "object" && "role" in obj) {
    const r = (obj as { role?: unknown }).role;
    if (r === "USER" || r === "ADMIN") return r;
  }
  return undefined;
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Username & Password",
      credentials: {
        username: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.username || !creds.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { username: creds.username },
        });
        
        if (!user || !user.passwordHash) return null;

        const ok = await bcryptjs.compare(creds.password, user.passwordHash);
        if (!ok) return null;

        // ADMIN 권한 체크
        if (user.role !== "ADMIN") return null;

        return {
          id: String(user.id),
          name: user.name ?? "관리자",
          email: user.email ?? "",
          image: user.image ?? "",
          role: user.role,
        };
      },
    }),
  ],

  pages: { signIn: "/admin/login" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);