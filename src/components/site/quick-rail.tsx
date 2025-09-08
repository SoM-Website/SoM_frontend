"use client";

import Link from "next/link";

function RailButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#C9B7A7] text-[18px] shadow transition hover:brightness-110"
      aria-label={label}
      title={label}
    >
      <span className="select-none">{children}</span>
      <span className="sr-only">{label}</span>
    </Link>
  );
}

export default function QuickRail() {
  return (
    <aside className="fixed right-4 bottom-24 z-40 hidden sm:flex flex-col items-center gap-2">
      <RailButton label="상담 문의" href="#contact">👤</RailButton>
      <RailButton label="프로그램" href="#programs">🎯</RailButton>
      <RailButton label="글 작성" href="/write">✏️</RailButton>
      <RailButton label="공지" href="/posts">🗂️</RailButton>
      <RailButton label="문의" href="#qna">💬</RailButton>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-white shadow hover:bg-neutral-700 transition"
        aria-label="맨 위로"
        title="맨 위로"
      >
        ⬆️
      </button>
    </aside>
  );
}
