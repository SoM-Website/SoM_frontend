// src/components/site/header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useSession, signOut } from "next-auth/react"; 
import { NAV, type NavItem } from '@/constants/navigation';

// MobileDrawer
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <button onClick={onClose} className="p-2" aria-label="메뉴 닫기">
            ✕
          </button>
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

// Header
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  // 데스크톱 가로 스크롤 상태
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      className={`relative shrink-0 text-[18px] leading-none py-3 ${
        isActive(item.href)
          ? "font-bold text-neutral-900"
          : "font-semibold text-neutral-700 hover:text-neutral-900"
      }`}
      aria-haspopup={item.children?.length ? "menu" : undefined}
    >
      {item.label}
      <span
        className={`absolute left-0 -bottom-[8px] h-[3px] rounded-full transition-all ${
          isActive(item.href) ? "w-full bg-neutral-900" : "w-0 bg-transparent"
        }`}
      />
    </Link>
  );

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [submenuLeft, setSubmenuLeft] = useState(0);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calcLeft = (idx: number) => {
    const rr = rowRef.current?.getBoundingClientRect();
    const ir = itemRefs.current[idx]?.getBoundingClientRect();
    if (rr && ir) setSubmenuLeft(ir.left - rr.left);
  };

  const openFor = (idx: number) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    const hasChildren = !!NAV[idx]?.children?.length;
    if (!hasChildren) {
      setMegaOpen(false);
      setHoveredIdx(null);
      return;
    }
    setHoveredIdx(idx);
    calcLeft(idx);
    setMegaOpen(true);
  };

  const closeWithDelay = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setMegaOpen(false);
      setHoveredIdx(null);
    }, 120);
  };

  useEffect(() => {
    const onResize = () => {
      if (!megaOpen || hoveredIdx == null) return;
      calcLeft(hoveredIdx);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [megaOpen, hoveredIdx]);

  return (
    <>
      <header className="sticky top-0 z-50 pt-5 bg-white backdrop-blur supports-[backdrop-filter]:bg-white">
        {/* 모바일: 한 줄(햄버거 + SoM + 로그인) */}
        <div className="container max-w-6xl mx-auto px-4 h-12 flex md:hidden items-center justify-between">
          <div className="flex items-center gap-2 -ml-2">
            <button
              className="inline-flex flex-col justify-center gap-[5px] p-2"
              aria-label="메뉴 열기"
              onClick={() => setOpen(true)}
            >
              <span className="h-[2px] w-6 bg-neutral-900 rounded" />
              <span className="h-[2px] w-6 bg-neutral-900 rounded" />
              <span className="h-[2px] w-6 bg-neutral-900 rounded" />
            </button>
            <Link href="/" className="text-base font-bold">
              SoM 상담 연구소
            </Link>
          </div>
          
          {/* 모바일 로그인/로그아웃 */}
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-xs text-neutral-600 hover:text-neutral-900"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/admin/login"
              className="text-xs text-neutral-600 hover:text-neutral-900"
            >
              로그인
            </Link>
          )}
        </div>

        {/* 데스크톱: 2행 */}
        <div className="hidden md:block">
          {/* 1행: 왼쪽 브랜드명 + 오른쪽 로그인 */}
          <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-xl md:text-2xl lg:text-3xl font-bold">
              SoM 상담 연구소
            </Link>
            
            {/* 데스크톱 로그인/로그아웃 */}
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-600">
                  {session.user?.name || '관리자'}님
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>

          {/* 2행: 메뉴 */}
          <div
            ref={rowRef}
            className="container max-w-6xl mx-auto px-4 h-14 hidden md:flex items-center justify-center relative"
            onMouseLeave={closeWithDelay}
          >
            <button
              type="button"
              aria-label="왼쪽으로 스크롤"
              onClick={() => scrollBy(-240)}
              disabled={!canLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-neutral-700 hover:bg-neutral-100 disabled:opacity-40"
            >
              ‹
            </button>

            <div ref={trackRef} className="overflow-x-auto whitespace-nowrap px-8">
              <nav className="inline-flex items-center gap-6">
                {NAV.map((item, idx) => (
                  <div
                    key={item.href}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    className="relative inline-block"
                    onMouseEnter={() => openFor(idx)}
                  >
                    <NavLink item={item} />
                  </div>
                ))}
              </nav>
            </div>

            <button
              type="button"
              aria-label="오른쪽으로 스크롤"
              onClick={() => scrollBy(240)}
              disabled={!canRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-neutral-700 hover:bg-neutral-100 disabled:opacity-40"
            >
              ›
            </button>

            {megaOpen && (
              <div
                className="absolute left-0 right-0 top-full z-40"
                onMouseEnter={() => {
                  if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
                }}
                onMouseLeave={closeWithDelay}
              >
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-screen h-full bg-white/97 supports-[backdrop-filter]:backdrop-blur-sm" />
                <div className="relative py-6">
                  <div style={{ marginLeft: submenuLeft }}>
                    {hoveredIdx !== null && NAV[hoveredIdx]?.children?.length ? (
                      <ul className="flex flex-col gap-2">
                        {NAV[hoveredIdx].children!.map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              className="block text-[15px] leading-6 text-neutral-800 hover:text-neutral-900 whitespace-nowrap hover:font-bold focus-visible:font-bold"
                              onClick={() => {
                                setMegaOpen(false);
                                setHoveredIdx(null);
                              }}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}