// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Header } from "@/components/site/header";
// Footer가 없으면 아래 줄 제거
// import { Footer } from "@/components/site/footer";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  // Pretendard 가변폰트 권장 범위 (공식 README의 Next.js 예시)
  weight: "45 920",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoM 상담 연구소",
  description: "상담 글, 소통, 자료를 위한 공간",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
