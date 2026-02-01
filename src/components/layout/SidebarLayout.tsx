// src/components/layout/SidebarLayout.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NAV } from '@/constants/navigation'
import { ReactNode } from 'react'

export default function SidebarLayout({ 
  header,
  children 
}: { 
  header?: ReactNode
  children: React.ReactNode 
}) {
  const pathname = usePathname()

  const currentNav = NAV.find(item => 
    pathname === item.href || pathname.startsWith(item.href + '/')
  )

  if (!currentNav?.children?.length) {
    return <>{children}</>
  }

  return (
    <>
      {/* 모바일: 상단 서브메뉴 */}
      <div className="lg:hidden container max-w-7xl mx-auto px-4 py-6">
        <div className="bg-neutral-50 rounded-xl p-4">
          <h2 className="text-lg font-bold text-neutral-900 mb-3">
            {currentNav.label}
          </h2>
          <nav className="flex flex-wrap gap-2">
            {currentNav.children.map((child) => {
              const isActive = pathname === child.href
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-[#000000]/3 text-[#735751] font-semibold'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 rounded-lg'
                  }`}
                >
                  {child.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10">
        {/* PageHeader - Content 영역 너비만큼 오른쪽으로 이동 */}
        {header && (
          <div className="lg:ml-[calc(256px+2rem)] mb-12">
            {header}
          </div>
        )}

        {/* Sidebar + Content - 같은 높이에서 시작 */}
        <div className="flex gap-8">
          {/* 왼쪽 사이드바 */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-neutral-900 pb-3 border-b-2 border-neutral-900">
                {currentNav.label}
              </h2>
            </div>

            <nav className="space-y-1">
              {currentNav.children.map((child) => {
                const isActive = pathname === child.href
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block px-4 py-3 text-[15px] transition-colors ${
                      isActive
                        ? 'bg-[#000000]/3 text-[#735751] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg'
                    }`}
                  >
                    {child.label}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}