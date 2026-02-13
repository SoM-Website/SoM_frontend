// src/components/admin/EditableImage.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Edit, Upload, Save, X } from "lucide-react";
import Image from "next/image";

interface Props {
  contentKey: string;
  initialSrc: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export function EditableImage({ 
  contentKey, 
  initialSrc, 
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes
}: Props) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [isEditing, setIsEditing] = useState(false);
  const [src, setSrc] = useState(initialSrc);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('업로드 실패');

      const { url } = await res.json();
      
      // DB에 저장
      const saveRes = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: contentKey, value: url }),
      });

      if (!saveRes.ok) throw new Error('저장 실패');

      setSrc(url);
      setIsEditing(false);
      alert('이미지가 변경되었습니다.');
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      <Image
        src={src}
        alt={alt}
        className={className}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
      />

      {isAdmin && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#735751] text-white p-2 rounded-full shadow-lg hover:bg-[#5d4641] z-10"
        >
          <Edit className="w-4 h-4" />
        </button>
      )}

      {isAdmin && isEditing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg space-y-4">
            <p className="font-medium">이미지 변경</p>
            <div className="flex gap-2">
              <label className="px-4 py-2 bg-[#735751] text-white rounded-lg cursor-pointer hover:bg-[#5d4641] flex items-center gap-2">
                <Upload className="w-4 h-4" />
                {uploading ? '업로드 중...' : '업로드'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}