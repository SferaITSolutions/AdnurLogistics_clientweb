// components/ImageUploader.tsx
import { useState } from 'react';
import { Upload, message, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useUploadImage } from '@/entities/hooks/products-hooks/hooks';

interface ImageUploaderProps {
  onUploadSuccess?: (url: string) => void;
  initialUrl?: string;
  maxSizeMB?: number;
  uploadPath?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  initialUrl,
  maxSizeMB = 5,
  uploadPath,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const { mutate: uploadImage, isPending: uploading } = useUploadImage();

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Faqat rasm fayllari yuklanishi mumkin!');
      return Upload.LIST_IGNORE;
    }

    const isLtMax = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLtMax) {
      message.error(`Rasm hajmi ${maxSizeMB}MB dan kichik bo'lishi kerak!`);
      return Upload.LIST_IGNORE;
    }

    // Preview uchun
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);

    if (uploadPath) {
      formData.append('path', uploadPath);
    }

    uploadImage(formData, {
      onSuccess: (response) => {
        console.log("res image", response?.result);

        const uploadedUrl = response?.result;
        if (uploadedUrl) {
          onUploadSuccess?.(uploadedUrl);
          setPreview(uploadedUrl);
          setFileList([
            {
              uid: '-1',
              name: file.name,
              status: 'done',
              url: uploadedUrl,
            },
          ]);
        }
      },
      onError: () => {
        setPreview(null);
        message.error('Rasm yuklashda xatolik yuz berdi!');
      },
    });

    return false;
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const handleRemove = () => {
    setFileList([]);
    setPreview(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <Upload
          listType="picture"
          fileList={[]}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          maxCount={1}
          accept="image/*"
          showUploadList={false}
          disabled={uploading}
          className="w-full"
        >
          <div className="relative group">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-3">
                {uploading ? (
                  <>
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium text-blue-600">
                      Yuklanmoqda...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Rasmni yuklash
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WEBP ({maxSizeMB}MB gacha)
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 !text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Tanlash
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Upload>
      ) : (
        <div className="relative group">
          <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-3">
                <Upload
                  listType="picture"
                  fileList={[]}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  maxCount={1}
                  accept="image/*"
                  showUploadList={false}
                  disabled={uploading}
                >
                  <button
                    type="button"
                    className="px-3 py-2.5 !bg-white !text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Almashtirish
                  </button>
                </Upload>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3 py-2.5 bg-red-500 !text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-lg"
                >
                  O'chirish
                </button>
              </div>
            </div>

            {/* Loading overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700">
                    Yuklanmoqda...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Image info */}
          <div className="mt-3 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-medium text-gray-600">
                Yuklangan
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {maxSizeMB}MB gacha
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;