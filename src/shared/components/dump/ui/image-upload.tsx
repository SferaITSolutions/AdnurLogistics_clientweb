"use client";
import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { useUploadImage } from "@/entities/hooks/products-hooks/hooks";
import {
  LuImagePlus,
  LuTrash2,
  LuRefreshCw,
} from "react-icons/lu";
import { FaCheckCircle, FaUpload } from "react-icons/fa";

interface ImageUploaderProps {
  onUploadSuccess?: (url: string) => void;
  initialUrl?: string;
  maxSizeMB?: number;
  uploadPath?: string;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  initialUrl,
  maxSizeMB = 5,
  uploadPath,
  label = "Rasm yuklash",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const { mutate: uploadImage, isPending: uploading } = useUploadImage();

  useEffect(() => {
    setPreview(initialUrl || null);
  }, [initialUrl]);

  const processFile = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Faqat rasm fayllari yuklanishi mumkin!");
      return;
    }
    const isLtMax = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLtMax) {
      message.error(`Rasm hajmi ${maxSizeMB}MB dan kichik bo'lishi kerak!`);
      return;
    }

    // Local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append("file", file);
    if (uploadPath) formData.append("path", uploadPath);

    uploadImage(formData, {
      onSuccess: (response) => {
        const uploadedUrl = response?.result;
        if (uploadedUrl) {
          onUploadSuccess?.(uploadedUrl);
          setPreview(uploadedUrl);
        }
      },
      onError: () => {
        setPreview(null);
        message.error("Rasm yuklashda xatolik yuz berdi!");
      },
    });
  };

  // Native input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input value so same file can be re-selected
    e.target.value = "";
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadSuccess?.("");
  };

  return (
    <div className="w-full">
      {/* Hidden native file input */}
      <input
        ref={inputRef}
        type="file"
        placeholder="Rasm yuklash"
        accept="image/*"
        className="!hidden"
        onChange={handleInputChange}
      />

      {!preview ? (
        /* ── DROP ZONE ── */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            w-full cursor-pointer rounded-2xl border-2 border-dashed
            transition-all duration-300 select-none
            ${
              isDragging
                ? "scale-[1.01] border-blue-500 bg-blue-50"
                : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/60"
            }
            ${uploading ? "pointer-events-none opacity-70" : ""}
          `}
        >
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-12">
            {uploading ? (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                  <FaUpload className="h-8 w-8 animate-bounce text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-blue-600">Yuklanmoqda...</p>
                  <p className="mt-1 text-xs text-gray-400">Iltimos kuting</p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`
                    flex h-16 w-16 items-center justify-center rounded-2xl
                    transition-all duration-300
                    ${isDragging ? "scale-110 bg-blue-200" : "bg-blue-100"}
                  `}
                >
                  <LuImagePlus
                    className={`h-8 w-8 transition-colors duration-300 ${
                      isDragging ? "text-blue-700" : "text-blue-500"
                    }`}
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700">{label}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG, WEBP · {maxSizeMB}MB gacha
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    yoki faylni shu yerga tashlang
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold !text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
                >
                  Fayl tanlash
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        /* ── PREVIEW ── */
        <div className="w-full">
          <div className="group relative w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <img
              src={preview}
              alt="Preview"
              className="h-64 w-full object-cover transition-all duration-300 group-hover:brightness-50"
            />

            {/* Action buttons on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white"
              >
                <LuRefreshCw className="h-4 w-4" />
                Almashtirish
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-2 rounded-xl bg-red-500/90 px-4 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-red-600"
              >
                <LuTrash2 className="h-4 w-4" />
                O'chirish
              </button>
            </div>

            {/* Loading overlay */}
            {uploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90 backdrop-blur-sm">
                <FaUpload className="h-10 w-10 animate-bounce text-blue-500" />
                <p className="text-sm font-semibold text-gray-700">Yuklanmoqda...</p>
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-xs font-medium text-gray-500">Yuklangan</span>
            </div>
            <span className="text-xs text-gray-400">{maxSizeMB}MB gacha</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;