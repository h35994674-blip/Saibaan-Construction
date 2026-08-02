'use client';

import * as React from 'react';
import { ImagePlus, Trash, Loader2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
  label?: string;
  isMultiple?: boolean;
}

export function ImageUpload({ value, onChange, onRemove, label = 'Upload Image', isMultiple = false }: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 32 * 1024 * 1024) {
      toast.error('Image must be less than 32MB');
      return;
    }

    setIsUploading(true);

    try {
      // Upload DIRECTLY from browser to ImgBB using the binary file
      // This is ~33% faster and uses less memory than Base64 conversion
      const formData = new FormData();
      formData.append('key', process.env.NEXT_PUBLIC_IMGBB_API_KEY || '');
      formData.append('image', file);

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data?.url) {
        onChange(data.data.url);
        toast.success('Image uploaded successfully!');
      } else {
        const errMsg = data.error?.message || 'Upload failed. Please try again.';
        console.error('ImgBB error:', data);
        toast.error(errMsg);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      setIsUploading(false);
      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-[var(--border)] group">
          <div className="aspect-[16/9] md:aspect-auto md:h-48 relative">
            <Image
              src={value}
              alt="Uploaded Image"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={onRemove}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Trash size={16} />
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-[var(--border)] rounded-lg transition-all group ${
              isUploading
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:border-gold hover:bg-[var(--bg-surface-1)] cursor-pointer'
            }`}
          >
            {isUploading ? (
              <Loader2 size={32} className="text-[var(--text-muted)] animate-spin mb-3" />
            ) : (
              <ImagePlus size={32} className="text-[var(--text-muted)] group-hover:text-gold mb-3 transition-colors" />
            )}
            <div className="text-sm font-medium text-[var(--text-secondary)]">
              {isUploading ? 'Uploading to ImgBB...' : label}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              Click to select an image (Max 32MB)
            </div>
          </button>
        </>
      )}
    </div>
  );
}
