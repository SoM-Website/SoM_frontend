// // src/app/layout.tsx
// import "./globals.css";
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import Script from "next/script";
// import { Header } from "@/components/site/header";
// import { Footer } from "@/components/site/footer";
// import NextAuthProvider from "@/components/site/session-provider"; // 추가

// const pretendard = localFont({
//   src: "./fonts/PretendardVariable.woff2",
//   weight: "45 920",
//   style: "normal",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "SoM 상담 연구소",
//   description: "상담 글, 소통, 자료를 위한 공간",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const clientId = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

//   return (
//     <html lang="ko">
//       <body className={`${pretendard.className} antialiased`}>
//         {/* 전역 네이버 지도 SDK 로드 */}
//         {clientId ? (
//           <Script
//             id="naver-maps"
//             strategy="afterInteractive"
//             src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`}
//           />
//         ) : null}

//         {/* 세션 컨텍스트 제공 (헤더의 로그인/권한 표시용) */}
//         <NextAuthProvider>
//           <Header />
//           <main className="min-h-screen">{children}</main>
//           <Footer />
//         </NextAuthProvider>
//       </body>
//     </html>
//   );
// }


// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import NextAuthProvider from "@/components/site/session-provider";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  weight: "45 920",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoM 상담 연구소",
  description: "상담 글, 소통, 자료를 위한 공간",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        {clientId ? (
          <Script
            id="naver-maps"
            strategy="afterInteractive"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`}
          />
        ) : null}

        <NextAuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}