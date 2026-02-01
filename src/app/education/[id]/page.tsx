// src/app/education/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import SidebarLayout from '@/components/layout/SidebarLayout'

type Post = { 
  id: number
  title: string
  content: string
  createdAt: string
}

export default function EducationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'
  
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const postId = params?.id as string

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/posts/${postId}`, { cache: 'no-store' })
        if (!res.ok) {
          if (res.status === 404) {
            setError('게시글을 찾을 수 없습니다.')
          } else {
            throw new Error('불러오기 실패')
          }
          return
        }
        const data = await res.json()
        setPost(data)
      } catch (err) {
        setError('게시글을 불러오는 중 오류가 발생했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      void loadPost()
    }
  }, [postId])

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    
    setDeleting(true)
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('삭제 실패')
      
      router.push('/education')
      router.refresh()
    } catch (err) {
      window.alert('삭제 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
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
        <div className="bg-[#000000]/3 py-20 px-8 text-center">
          <p className="text-neutral-600">불러오는 중…</p>
        </div>
      </SidebarLayout>
    )
  }

  if (error || !post) {
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
        <div className="bg-[#000000]/3 py-20 px-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {error || '게시글을 찾을 수 없습니다'}
          </h1>
          <Link
            href="/education"
            className="inline-block px-6 py-2 bg-neutral-900 text-white hover:bg-neutral-800"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </SidebarLayout>
    )
  }

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
        {/* 헤더: 제목과 날짜 */}
        <div className="pb-6 mb-8 border-b-2 border-neutral-300">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-between">
            <time className="text-sm text-neutral-600">
              최종 수정일: {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </time>
          </div>
        </div>

        {/* 본문 내용 */}
        <article className="bg-white p-8 mb-8">
          <div className="prose prose-neutral max-w-none">
            <p className="whitespace-pre-wrap text-base md:text-lg leading-relaxed text-neutral-800">
              {post.content}
            </p>
          </div>
        </article>

        {/* 하단 버튼들 */}
        <div className="flex items-center justify-between pt-6 border-t border-neutral-300">
          <Link
            href="/education"
            className="px-6 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
          >
            목록
          </Link>
          
          {isAdmin && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-6 py-2 bg-white text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-50 transition-colors text-sm"
            >
              {deleting ? '삭제 중…' : '삭제'}
            </button>
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}