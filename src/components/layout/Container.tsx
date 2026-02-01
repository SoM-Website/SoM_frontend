import clsx from "clsx";
import React from "react";

type ContainerProps = {
  /** 사이트 전역 기본: md. 필요할 때만 변경 */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
};

const sizeClass = {
  sm: "max-w-3xl",
  md: "max-w-5xl",  // ✅ 기본
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export default function Container({ size = "md", className, children }: ContainerProps) {
  return (
    <div className={clsx("mx-auto w-full px-4 sm:px-6", sizeClass[size], className)}>
      {children}
    </div>
  );
}
