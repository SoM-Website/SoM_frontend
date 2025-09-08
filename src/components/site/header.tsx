"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "연구소 소개", href: "/about" },
  { label: "함께하는 사람들", href: "/people" },
  { label: "내부시설", href: "/facility" },
  { label: "상담서비스", href: "/services" },
  { label: "SoM 프로그램", href: "/programs" },
  { label: "상담전문가 수련", href: "/training" },
  { label: "교육안내", href: "/education" },
  { label: "예약신청", href: "/reserve" },
  { label: "오시는길", href: "/directions" },
];

// ─────────────────────────────────────────────
// MobileDrawer: body에 포털로 렌더링하는 사이드바
// ─────────────────────────────────────────────
function MobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const id = requestAnimationFrame(() => setReveal(true));
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        cancelAnimationFrame(id);
        window.removeEventListener("keydown", onKey);
      };
    } else {
      setReveal(false);
    }
  }, [open, mounted, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] sm:hidden"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`absolute left-0 top-0 h-full w-72 bg-white p-5 
                    shadow-[2px_0_10px_rgba(0,0,0,0.15)]
                    transform transition-transform duration-300
                    ${reveal ? "translate-x-0" : "-translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end mb-4">
          <button onClick={onClose} className="p-2" aria-label="메뉴 닫기">✕</button>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={`m-${item.href}`}
              href={item.href}
              onClick={onClose}
              className={`rounded-md px-3 py-2 text-[15px] text-left ${
                isActive(item.href)
                  ? "bg-neutral-100 font-semibold text-neutral-900"
                  : "text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>,
    document.body
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 데스크톱 가로 스크롤
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

  // 현재 페이지 제목 (NAV 매칭: 더 긴 href 우선)
  const currentLabel = (() => {
    const found = [...NAV]
      .sort((a, b) => b.href.length - a.href.length)
      .find((item) =>
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
      );
    return found?.label ?? "";
  })();

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
    <>
      <header className="sticky top-0 z-50 pt-5 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        {/* 1행: 왼쪽 정렬 브랜드명 */}
        <div className="container max-w-6xl mx-auto px-4 h-10 flex items-center justify-start">
          <Link href="/" className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
            SoM 상담 연구소
          </Link>
        </div>

        {/* 2행: 메뉴 */}
        <div className="container max-w-6xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          {/* 모바일: 햄버거 + 현재 페이지 제목 */}
          <div className="sm:hidden flex items-center gap-2 -ml-2">
            <button
              className="inline-flex flex-col justify-center gap-[5px] p-2"
              aria-label="메뉴 열기"
              onClick={() => setOpen(true)}
            >
              <span className="h-[2px] w-6 bg-neutral-900 rounded" />
              <span className="h-[2px] w-6 bg-neutral-900 rounded" />
              <span className="h-[2px] w-6 bg-neutral-900 rounded" />
            </button>
            {/* 페이지 제목: 메뉴 포맷과 동일한 크기/스타일로 표시 */}
            <span className="text-[15px] leading-none font-bold text-neutral-900">
              {currentLabel}
            </span>
          </div>

          {/* 데스크탑: 가로 스크롤 가능한 탭 */}
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
      </header>

      {/* 헤더 밖(body)에 포털로 붙는 모바일 드로어 */}
      <MobileDrawer open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}
