import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Container from "@/components/layout/Container";


type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  description?: React.ReactNode;
  subDescription?: React.ReactNode;
  breadcrumbs?: Crumb[];
  variant?: "simple" | "split";
  align?: "left" | "center";
  bgMuted?: boolean;
  showDivider?: boolean;
  /** 헤더 컨테이너의 폭만 바꾸고 싶을 때 */
  containerSize?: "sm" | "md" | "lg" | "xl"; 
  /** 바깥 래퍼(max-w, px 등) 오버라이드 */
  className?: string;
  /** 제목 왼쪽 여백(pl-*) 등 미세 정렬 */
  titleClassName?: string;
  id?: string;
};


export default function PageHeader({
  title,
  description,
  subDescription,      
  breadcrumbs,
  variant = "simple",
  align = "left",
  bgMuted = false,
  showDivider = false,
  containerSize = "md",
  className,
  titleClassName,
  id = "page-title",
}: Props) {
  return (
    <section
      aria-labelledby={id}
      className={clsx(
        "relative",
        bgMuted && "bg-neutral-50",
        showDivider && "border-b border-neutral-200",
        "scroll-mt-28",
        "pt-24 pb-12 md:pt-36 md:pb-16"
      )}
    >
      {/* 본문과 동일 규격 기본값 */}
      <div className={clsx("mx-auto w-full max-w-5xl px-4 sm:px-6", className)}>
        {breadcrumbs?.length ? (
          <nav className="mb-4 text-sm text-neutral-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              {breadcrumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-neutral-700">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <span>›</span>}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {variant === "split" ? (
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <h1
              id={id}
              className={clsx(
                "text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900",
                titleClassName
              )}
            >
              {title}
            </h1>

            {/* 우측 설명 블럭: description + subDescription */}
            {(description || subDescription) && (
              <div className="flex flex-col gap-3">
                {description && (
                  <p className="text-lg md:text-2xl leading-relaxed text-neutral-700">
                    {description}
                  </p>
                )}
                {subDescription && (
                  <p className="text-sm md:text-base leading-relaxed text-neutral-500">
                    {subDescription}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            className={clsx(
              "flex flex-col gap-4",
              align === "center" && "items-center text-center"
            )}
          >
            <h1
              id={id}
              className={clsx(
                "text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900",
                titleClassName
              )}
            >
              {title}
            </h1>

            {description && (
              <p className="max-w-3xl text-lg md:text-2xl leading-relaxed text-neutral-700">
                {description}
              </p>
            )}

            {subDescription && (
              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-neutral-500">
                {subDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
