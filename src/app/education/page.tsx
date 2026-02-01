// src/app/education/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import SidebarLayout from '@/components/layout/SidebarLayout'

type Post = { id: number; title: string; content: string; createdAt: string }

export default function EducationPage() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'
  
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const loadPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/posts', { cache: 'no-store' })
      if (!res.ok) throw new Error('목록 조회 실패')
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadPosts()
  }, [])

  // 검색 필터링
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <SidebarLayout
      header={
        <PageHeader
          title="교육안내"
          variant="split"
          noContainer={true}
        />
      }
    >
      <div className="bg-[#000000]/3 py-10 px-8">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900">
            전체
          </h2>
          
          <div className="flex items-center gap-3">
            {/* 검색창 */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="제목, 내용 검색"
                className="w-full sm:w-64 px-4 py-2 pr-10 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* 글 작성 버튼 */}
            {isAdmin && (
              <Link
                href="/education/write"
                className="px-6 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors whitespace-nowrap"
              >
                글 작성
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-neutral-600">불러오는 중…</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-neutral-600">
            {searchQuery ? '검색 결과가 없습니다.' : '등록된 공지가 없습니다.'}
          </p>
        ) : (
          <div className="bg-white overflow-hidden">
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-[80px_1fr_150px] gap-4 px-6 py-4 bg-neutral-50 border-b border-neutral-200 text-sm font-semibold text-neutral-700">
              <div className="text-center">번호</div>
              <div>제목</div>
              <div className="text-center hidden sm:block">작성일</div>
            </div>

            {/* 게시글 목록 */}
            <ul>
              {filteredPosts.map((post, index) => (
                <li key={post.id} className="border-b border-neutral-200 last:border-0">
                  <Link
                    href={`/education/${post.id}`}
                    className="grid grid-cols-[80px_1fr_150px] gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="text-center text-neutral-600">
                      {posts.length - posts.findIndex(p => p.id === post.id)}
                    </div>
                    <div className="text-neutral-900 font-medium truncate">
                      {post.title}
                    </div>
                    <div className="text-center text-sm text-neutral-500 hidden sm:block">
                      {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 검색 결과 개수 표시 */}
        {searchQuery && !loading && (
          <p className="mt-4 text-sm text-neutral-600">
            총 {filteredPosts.length}개의 게시글이 검색되었습니다.
          </p>
        )}
      </div>
    </SidebarLayout>
  )
}