'use client';

import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Camera, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
interface AvatarUploadProps {
  currentAvatar?: string;
  userName?: string;
  onUploadSuccess?: (url: string) => void;
}

export default function AvatarUpload({
  currentAvatar,
  userName = 'User',
  onUploadSuccess,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleFile = async (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;

    // ❌ type error
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Sirf JPG, PNG ya WebP images allowed hain.',
      });
      return;
    }

    // ❌ size error
    if (file.size > maxSize) {
      toast.error('File too large', {
        description: 'Maximum file size 5MB honi chahiye.',
      });
      return;
    }

    // preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf-token='))
        ?.split('=')[1];

      const response = await fetch('/api/auth/upload/avatar', {
        method: 'POST',
        headers: {
          'x-csrf-token': csrfToken || '',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      toast.success('Avatar uploaded', {
        description: 'Aap ki profile picture successfully update ho gayi hai.',
      });

      onUploadSuccess?.(data.data.avatar);
    } catch (error: any) {
      toast.error('Upload failed', {
        description: error.message || 'Kuch ghalat ho gaya.',
      });
      setPreview(currentAvatar || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeAvatar = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    toast.message('Avatar removed');
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'U';
  return (
    <>
      {/* ✅ Sonner UI */}
      <Toaster position="top-center" richColors />

      <div className="flex flex-col items-center space-y-4">
        <div
          className={`relative cursor-pointer ${
            dragActive ? 'ring-4 ring-blue-400' : ''
          }`}
          onClick={() => inputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Avatar className="w-32 h-32 border-4 border-gray-200">
            <AvatarImage 
  src={preview || user?.profile?.avatar || undefined} 
  alt="Profile picture" 
/>
            <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>

          {/* hover overlay */}
          {!isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition">
              <Camera className="w-8 h-8 text-white" />
            </div>
          )}

          {/* loader */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}

          {/* remove */}
          {preview && !isUploading && (
            <button
              onClick={e => {
                e.stopPropagation();
                removeAvatar();
              }}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleChange}
        />

        <div className="text-center text-sm text-gray-500">
          <p>Click ya drag image to upload</p>
          <p>JPG, PNG, WebP — max 5MB</p>
        </div>
      </div>
    </>
  );
}