// src/app/reserve/page.tsx
'use client'

import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import SidebarLayout from '@/components/layout/SidebarLayout'

const CONSULTATION_TYPES = [
  '개인상담',
  '부부 & 커플상담',
  '청소년 및 부모역할상담',
  '미술치료',
  '집단상담',
  '심리검사',
]

export default function ReservePage() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    phone: '',
    password: '',
    email: '',
    title: '',
    content: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // 전화번호 입력 시 숫자만 허용
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '')
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.type || !formData.name || !formData.phone || !formData.password || !formData.email) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    // 전화번호 형식 검증 (숫자 10-11자리)
    if (formData.phone.length < 10 || formData.phone.length > 11) {
      alert('연락처는 10-11자리 숫자로 입력해주세요.')
      return
    }

    // 비밀번호 최소 길이 검증
    if (formData.password.length < 4) {
      alert('비밀번호는 최소 4자리 이상 입력해주세요.')
      return
    }

    setSubmitting(true)
    
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '신청 실패')
      }
      
      setSuccess(true)
      setFormData({
        type: '',
        name: '',
        phone: '',
        password: '',
        email: '',
        title: '',
        content: '',
      })
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error(err)
      alert(err instanceof Error ? err.message : '상담 신청 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SidebarLayout
      header={
        <PageHeader
          title="상담신청"
          variant="split"
          noContainer={true}
        />
      }
    >
      <div className="bg-[#000000]/3 py-10 px-8 ">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-center">
            ✓ 상담 신청이 완료되었습니다. 곧 연락드리겠습니다.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 상담구분 */}
          <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
            <label htmlFor="type" className="text-neutral-700 font-medium">
              상담구분
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="px-4 py-2 border border-neutral-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              disabled={submitting}
              required
            >
              <option value="">선택하세요</option>
              {CONSULTATION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* 이름 */}
          <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
            <label htmlFor="name" className="text-neutral-700 font-medium">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              disabled={submitting}
              required
            />
          </div>

          {/* 비밀번호 */}
          <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
            <label htmlFor="password" className="text-neutral-700 font-medium pt-2">
              비밀번호
            </label>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="최소 4자리"
                disabled={submitting}
                required
              />
              <p className="mt-1 text-sm text-neutral-600">
                신청 내역 조회 시 사용됩니다. (최소 4자리)
              </p>
            </div>
          </div>

          {/* 연락처 */}
          <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
            <label htmlFor="phone" className="text-neutral-700 font-medium pt-2">
              연락처
            </label>
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="01012345678"
                maxLength={11}
                disabled={submitting}
                required
              />
              <p className="mt-1 text-sm text-blue-700">
                정확한 연락처를 입력해 주시기 바랍니다. (- 없이 입력)
              </p>
            </div>
          </div>

          {/* 이메일 */}
          <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
            <label htmlFor="email" className="text-neutral-700 font-medium">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              disabled={submitting}
              required
            />
          </div>

          {/* 제목 */}
          <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
            <label htmlFor="title" className="text-neutral-700 font-medium">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              disabled={submitting}
            />
          </div>

          {/* 내용 */}
          <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
            <label htmlFor="content" className="text-neutral-700 font-medium pt-2">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
              disabled={submitting}
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-white border-2 border-[#000000] text-[#4d3f34] rounded hover:bg-[#4d3f34] hover:text-white transition-colors disabled:opacity-50 font-medium"
              disabled={submitting}
            >
              {submitting ? '작성완료 중...' : '작성완료'}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-neutral-600 text-white rounded hover:bg-neutral-700 transition-colors font-medium"
              disabled={submitting}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  )
}