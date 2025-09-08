"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string };

// 한 줄로 모두 나열 (필요시 href 조정)
const NAV: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "연구소 소개", href: "/about" },
  { label: "함께하는 사람들", href: "/people" },
  { label: "내부시설", href: "/facility" },
  { label: "상담서비스", href: "/services" },
  { label: "SoM 프로그램", href: "/programs" },
  { label: "상담전문가 수련", href: "/training" },
  { label: "교육안내", href: "/education" },
  { label: "예약신청", href: "/reserve" },     // ← 필요 없으면 /education 유지 가능
  { label: "오시는길", href: "/directions" },  // ← 필요 없으면 /education 유지 가능
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 가로 스크롤(화살표)만 유지 — 필요 없으면 아래 전부 제거 가능
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollBy = (dx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
    setTimeout(updateScrollState, 200);
  };

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const NavLink = ({ item }: { item: NavItem }) => (
  <Link
      key={item.href}
      href={item.href}
      aria-current={isActive(item.href) ? "page" : undefined}
      className={`relative shrink-0 text-[15px] leading-none py-2 ${
        isActive(item.href)
          ? "font-bold text-neutral-900"
          : "font-semibold text-neutral-700 hover:text-neutral-900"
      }`}
    >
      {item.label}
      <span
        className={`absolute left-0 -bottom-[6px] h-[2px] rounded-full transition-all ${
          isActive(item.href) ? "w-full bg-neutral-900" : "w-0 bg-transparent"
        }`}
      />
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* 좌측: 햄버거 + 브랜드 */}
        <div className="flex items-center gap-3">
          <button
            className="sm:hidden inline-flex flex-col justify-center gap-[5px] p-2 -ml-2"
            aria-label="메뉴 열기"
            onClick={() => setOpen(true)}
          >
            <span className="h-[2px] w-6 bg-neutral-900 rounded" />
            <span className="h-[2px] w-6 bg-neutral-900 rounded" />
            <span className="h-[2px] w-6 bg-neutral-900 rounded" />
          </button>

          <Link href="/" className="text-lg sm:text-xl font-bold">
            솜(SoM)상담연구소
          </Link>
        </div>

        {/* 데스크탑: 가로 스크롤 가능 탭 + 좌/우 화살표 */}
        <div className="relative hidden md:flex items-center flex-1">
          {canLeft && (
            <button
              onClick={() => scrollBy(-240)}
              className="absolute left-0 z-10 h-8 w-8 rounded-full bg-white/90 shadow border flex items-center justify-center hover:bg-white"
              aria-label="이전"
              title="이전"
            >
              ‹
            </button>
          )}

          <div
            ref={trackRef}
            className="mx-10 flex items-center gap-6 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {NAV.map((item) => <NavLink key={item.href} item={item} />)}
          </div>

          {canRight && (
            <button
              onClick={() => scrollBy(240)}
              className="absolute right-0 z-10 h-8 w-8 rounded-full bg-white/90 shadow border flex items-center justify-center hover:bg-white"
              aria-label="다음"
              title="다음"
            >
              ›
            </button>
          )}
        </div>
      </div>

      {/* 모바일 패널 — NAV만 사용 (중복 제거) */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 sm:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-72 bg-white shadow-lg p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">메뉴</div>
              <button onClick={() => setOpen(false)} className="p-2 -mr-2" aria-label="메뉴 닫기">✕</button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={`m-${item.href}`}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-[15px] ${
                    isActive(item.href) ? "bg-neutral-100 font-semibold text-neutral-900" : "text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
