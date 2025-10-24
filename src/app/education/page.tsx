// src/app/education/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'

type Post = { id: number; title: string; content: string; createdAt: string }

export default function EducationGuidePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPosts = async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/posts', { cache: 'no-store' })
      if (!res.ok) throw new Error('목록 조회 실패')
      const data: Post[] = await res.json()
      setPosts(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '목록을 불러오지 못했습니다.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadPosts()
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string }
        throw new Error(body.message ?? '작성 실패')
      }
      const created: Post = await res.json()
      setPosts(prev => [created, ...prev])
      setTitle('')
      setContent('')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '작성 중 오류가 발생했습니다.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const onDelete = async (id: number): Promise<void> => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string }
        throw new Error(body.message ?? '삭제 실패')
      }
      setPosts(prev => prev.filter(p => p.id !== id))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.'
      window.alert(msg)
    }
  }

  return (
    <>
      <section className="bg-neutral-50 py-10">
        <Container>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900">공지 작성</h2>
          <form onSubmit={onSubmit} className="mt-6 grid gap-3">
            <input
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              className="w-full min-h-[120px] rounded-lg border border-neutral-300 px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="내용을 입력하세요"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-neutral-900 px-4 py-2 text-white disabled:opacity-60"
            >
              {submitting ? '작성 중…' : '작성'}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </Container>
      </section>

      <Container>
        <hr className="my-12 border-neutral-200" />
        <h2 className="text-xl md:text-2xl font-bold text-neutral-900">교육 안내 게시판</h2>
        {loading ? (
          <p className="mt-6 text-neutral-600">불러오는 중…</p>
        ) : posts.length === 0 ? (
          <p className="mt-6 text-neutral-600">등록된 공지가 없습니다.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {posts.map(post => (
              <li key={post.id} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{post.title}</h3>
                    <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-neutral-700">
                      {post.content}
                    </p>
                    <p className="mt-3 text-xs text-neutral-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => void onDelete(post.id)}
                    className="shrink-0 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100"
                    aria-label="삭제"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  )
}
