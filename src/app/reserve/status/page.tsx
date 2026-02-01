// src/app/reserve/status/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import PageHeader from '@/components/PageHeader'
import SidebarLayout from '@/components/layout/SidebarLayout'

type Reservation = {
  id: number
  type: string
  name: string
  phone: string
  email: string
  title: string | null
  content: string | null
  status: string
  createdAt: string
  updatedAt: string
}

const CONSULTATION_TYPES = [
  '개인상담',
  '부부 & 커플상담',
  '청소년 및 부모역할상담',
  '미술치료',
  '집단상담',
  '심리검사',
]

const STATUS_LABELS: Record<string, string> = {
  pending: '대기중',
  confirmed: '확정',
  completed: '상담완료',
  cancelled: '취소',
}

const ADMIN_STATUS_OPTIONS = ['pending', 'confirmed', 'completed'] as const

export default function ReservationStatusPage() {
  const { data: session, status: sessionStatus } = useSession()
  const isAdmin = (session?.user as any)?.role === 'ADMIN'

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authData, setAuthData] = useState({ name: '', password: '' })
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<Reservation>>({})

  // 관리자면 자동으로 전체 예약 목록 로드
  useEffect(() => {
    if (!isAdmin) return
    if (sessionStatus !== 'authenticated') return

    const run = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/admin/reservations', { method: 'GET' })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || '조회 실패')
        }

        setReservations(data.reservations)
        setIsAuthenticated(true)
      } catch (e) {
        alert(e instanceof Error ? e.message : '조회 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [isAdmin, sessionStatus])

  // 일반 사용자 인증
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isAdmin) {
      alert('관리자 계정은 이 화면에서 별도 인증이 필요하지 않습니다.')
      return
    }

    if (!authData.name || !authData.password) {
      alert('이름과 비밀번호를 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/reservations/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '인증 실패')
      }

      setReservations(data.reservations)
      setIsAuthenticated(true)
    } catch (err) {
      alert(err instanceof Error ? err.message : '인증 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 관리자 상태 변경
  const handleAdminStatusChange = async (id: number, nextStatus: string) => {
    if (!isAdmin) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '상태 변경 실패')

      setReservations(prev => prev.map(r => (r.id === id ? data : r)))
    } catch (e) {
      alert(e instanceof Error ? e.message : '상태 변경 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 관리자 삭제
  const handleAdminDelete = async (id: number) => {
    if (!isAdmin) return
    if (!confirm('정말 삭제하시겠습니까?')) return

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error((data as any).error || '삭제 실패')
      }

      setReservations(prev => prev.filter(r => r.id !== id))
      alert('삭제되었습니다.')
    } catch (e) {
      alert(e instanceof Error ? e.message : '삭제 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 수정 시작
  const handleEdit = (reservation: Reservation) => {
    if (isAdmin) return
    setEditingId(reservation.id)
    setEditData(reservation)
  }

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  // 수정 저장
  const handleSave = async (id: number) => {
    if (isAdmin) return

    if (!editData.type || !editData.phone || !editData.email) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editData,
          password: authData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '수정 실패')
      }

      setReservations(prev => prev.map(r => (r.id === id ? data : r)))
      setEditingId(null)
      setEditData({})
      alert('수정되었습니다.')
    } catch (err) {
      alert(err instanceof Error ? err.message : '수정 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 삭제(일반 사용자)
  const handleDelete = async (id: number) => {
    if (isAdmin) return
    if (!confirm('정말 삭제하시겠습니까?')) return

    setLoading(true)

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: authData.password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '삭제 실패')
      }

      setReservations(prev => prev.filter(r => r.id !== id))
      alert('삭제되었습니다.')
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 인증 전 화면
  if (!isAuthenticated) {
    if (isAdmin) {
      return (
        <SidebarLayout header={<PageHeader title="신청내역 조회" variant="split" noContainer={true} />}>
          <div className="bg-[#000000]/3 py-10 px-8 text-center text-neutral-700">
            {sessionStatus === 'loading' ? '세션 확인 중...' : loading ? '불러오는 중...' : '관리자 세션을 확인했습니다.'}
          </div>
        </SidebarLayout>
      )
    }

    return (
      <SidebarLayout header={<PageHeader title="신청내역 조회" variant="split" noContainer={true} />}>
        <div className="bg-[#000000]/3 py-10 px-8">
          <div className="max-w-md mx-auto">
            <p className="text-center text-neutral-700 mb-6">
              신청 시 입력하신 이름과 비밀번호를 입력해주세요.
            </p>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={authData.name}
                  onChange={(e) => setAuthData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  value={authData.password}
                  onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '확인 중...' : '확인'}
              </button>
            </form>
          </div>
        </div>
      </SidebarLayout>
    )
  }

  // 인증 후 목록 화면
  return (
    <SidebarLayout header={<PageHeader title="신청내역 조회" variant="split" noContainer={true} />}>
      <div className="space-y-6">
        {reservations.length === 0 ? (
          <div className="bg-[#000000]/3 py-10 px-8 text-center text-neutral-700">
            예약 내역이 없습니다.
          </div>
        ) : null}

        {reservations.map((reservation) => {
          const isEditing = editingId === reservation.id
          const data = isEditing ? editData : reservation

          return (
            <div key={reservation.id} className="bg-[#000000]/3 py-6 px-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-neutral-600">
                    신청일: {new Date(reservation.createdAt).toLocaleDateString('ko-KR')}
                  </span>

                  {isAdmin ? (
                    <select
                      value={reservation.status}
                      onChange={(e) => handleAdminStatusChange(reservation.id, e.target.value)}
                      className="ml-4 px-3 py-1 border border-neutral-300 rounded text-sm bg-white"
                      disabled={loading}
                    >
                      {ADMIN_STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s] ?? s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="ml-4 px-3 py-1 bg-neutral-100 text-neutral-700 rounded text-sm">
                      {STATUS_LABELS[reservation.status] ?? reservation.status}
                    </span>
                  )}
                </div>

                {!isEditing ? (
                  <div className="flex gap-2">
                    {!isAdmin ? (
                      <>
                        <button
                          onClick={() => handleEdit(reservation)}
                          className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors text-sm"
                          disabled={loading}
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(reservation.id)}
                          className="px-4 py-2 bg-white text-neutral-900 border-2 border-neutral-900 rounded hover:bg-neutral-50 transition-colors text-sm"
                          disabled={loading}
                        >
                          삭제
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAdminDelete(reservation.id)}
                        className="px-4 py-2 bg-white text-neutral-900 border-2 border-neutral-900 rounded hover:bg-neutral-50 transition-colors text-sm"
                        disabled={loading}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-[120px_1fr] gap-4 text-sm">
                <div className="text-neutral-600">상담구분</div>
                <div>
                  {!isAdmin && isEditing ? (
                    <select
                      value={String(data.type ?? '')}
                      onChange={(e) => setEditData(prev => ({ ...prev, type: e.target.value }))}
                      className="px-3 py-1 border border-neutral-300 rounded"
                    >
                      {CONSULTATION_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  ) : (
                    reservation.type
                  )}
                </div>

                <div className="text-neutral-600">이름</div>
                <div>{reservation.name}</div>

                <div className="text-neutral-600">연락처</div>
                <div>
                  {!isAdmin && isEditing ? (
                    <input
                      type="tel"
                      value={String(data.phone ?? '')}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value.replace(/[^0-9]/g, '') }))}
                      className="px-3 py-1 border border-neutral-300 rounded"
                      maxLength={11}
                    />
                  ) : (
                    reservation.phone
                  )}
                </div>

                <div className="text-neutral-600">이메일</div>
                <div>
                  {!isAdmin && isEditing ? (
                    <input
                      type="email"
                      value={String(data.email ?? '')}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="px-3 py-1 border border-neutral-300 rounded w-full"
                    />
                  ) : (
                    reservation.email
                  )}
                </div>

                {reservation.title ? (
                  <>
                    <div className="text-neutral-600">제목</div>
                    <div>
                      {!isAdmin && isEditing ? (
                        <input
                          type="text"
                          value={String(data.title ?? '')}
                          onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                          className="px-3 py-1 border border-neutral-300 rounded w-full"
                        />
                      ) : (
                        reservation.title
                      )}
                    </div>
                  </>
                ) : null}

                {reservation.content ? (
                  <>
                    <div className="text-neutral-600">내용</div>
                    <div>
                      {!isAdmin && isEditing ? (
                        <textarea
                          value={String(data.content ?? '')}
                          onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
                          className="px-3 py-1 border border-neutral-300 rounded w-full"
                          rows={4}
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap">{reservation.content}</pre>
                      )}
                    </div>
                  </>
                ) : null}
              </div>

              {!isAdmin && isEditing ? (
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={() => handleSave(reservation.id)}
                    className="px-6 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors"
                    disabled={loading}
                  >
                    {loading ? '저장 중...' : '저장'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-2 bg-white text-neutral-900 border-2 border-neutral-900 rounded hover:bg-neutral-50 transition-colors"
                    disabled={loading}
                  >
                    취소
                  </button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </SidebarLayout>
  )
}
