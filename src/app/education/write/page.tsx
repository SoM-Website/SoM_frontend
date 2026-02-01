// src/app/education/write/page.tsx
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Container from '@/components/layout/Container'

export default function EducationWritePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 로딩 중
  if (status === 'loading') {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-neutral-600">로딩 중...</p>
        </div>
      </Container>
    )
  }

  // 관리자 아니면 접근 불가
  if (!session?.user || session.user.role !== 'ADMIN') {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            접근 권한이 없습니다
          </h1>
          <p className="text-neutral-600 mb-6">
            관리자만 접근할 수 있는 페이지입니다.
          </p>
          <button
            onClick={() => router.push('/education')}
            className="px-6 py-2 bg-neutral-900 text-white  hover:bg-neutral-800"
          >
            게시판으로 돌아가기
          </button>
        </div>
      </Container>
    )
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.')
      return
    }
    
    setSubmitting(true)
    setError(null)
    
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: title.trim(), 
          content: content.trim() 
        }),
      })
      
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || '작성 실패')
      }
      
      // 작성 성공 후 게시판으로 이동
      router.push('/education')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : '작성 중 오류가 발생했습니다.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
          교육 안내 작성
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="title"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full  border border-neutral-300 px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="content"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full min-h-[300px] border border-neutral-300 px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-400 resize-y"
              placeholder="내용을 입력하세요"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 ">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? '작성 중…' : '작성하기'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/education')}
              className="px-8 py-3 border border-neutral-300 hover:bg-neutral-50 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </Container>
  )
}