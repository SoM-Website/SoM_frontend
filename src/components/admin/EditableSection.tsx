// src/components/admin/EditableSection.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Edit, Save, X } from "lucide-react";

interface Props {
  contentKey: string; // 예: "about-intro", "services-description"
  initialValue: string;
  renderView: (value: string) => React.ReactNode; // 일반 사용자가 보는 화면
  renderEdit?: (value: string, onChange: (v: string) => void) => React.ReactNode; // 편집 화면 (선택)
  onSave?: (value: string) => Promise<void>; // 커스텀 저장 로직
}

export function EditableSection({ 
  contentKey, 
  initialValue, 
  renderView,
  renderEdit,
  onSave 
}: Props) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (onSave) {
        await onSave(value);
      } else {
        // 기본 저장 로직
        const res = await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: contentKey, value }),
        });
        if (!res.ok) throw new Error('저장 실패');
      }
      setIsEditing(false);
      alert('저장되었습니다.');
    } catch (error) {
      alert('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (!isAdmin) {
    return <>{renderView(value)}</>;
  }

  return (
    <div className="relative group">
      {/* 일반 모드 */}
      {!isEditing && (
        <>
          {renderView(value)}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#735751] text-white p-2 rounded-full shadow-lg hover:bg-[#5d4641]"
          >
            <Edit className="w-4 h-4" />
          </button>
        </>
      )}

      {/* 편집 모드 */}
      {isEditing && (
        <div className="border-2 border-[#735751] rounded-lg p-4">
          {renderEdit ? (
            renderEdit(value, setValue)
          ) : (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full min-h-[200px] px-3 py-2 border rounded-lg"
            />
          )}
          
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setValue(initialValue);
                setIsEditing(false);
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <X className="w-4 h-4 inline mr-1" />
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-[#735751] text-white rounded-lg hover:bg-[#5d4641] disabled:opacity-50"
            >
              <Save className="w-4 h-4 inline mr-1" />
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}