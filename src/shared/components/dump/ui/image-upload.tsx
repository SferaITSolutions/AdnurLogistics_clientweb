// components/ImageUploader.tsx
import { useState } from 'react';
import { Upload, message, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';

// react-icons dan Ant Design ikonlari
import { AiOutlinePlus, AiOutlineLoading, AiOutlineUpload } from 'react-icons/ai';
import { useUploadImage } from '@/entities/hooks/products-hooks/hooks';

interface ImageUploaderProps {
  onUploadSuccess?: (url: string) => void;
  initialUrl?: string;
  maxSizeMB?: number;     // default 5MB
  uploadPath?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  initialUrl,
  maxSizeMB = 5,
  uploadPath,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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

    const formData = new FormData();
    formData.append('file', file);

    if (uploadPath) {
      formData.append('path', uploadPath);
    }
    // formData.append('type', 'product');   // agar kerak bo'lsa

    uploadImage(formData, {
      onSuccess: (response) => {
        console.log("res image",response?.result);
        
        const uploadedUrl = response?.result;
        if (uploadedUrl) {
          onUploadSuccess?.(uploadedUrl);
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
    });

    return false; // Ant Design o'z yuklashini to'xtatish uchun
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // faqat bitta rasm
  };

  const uploadButton = (
    <div>
      {uploading ? (
        <AiOutlineLoading className="animate-spin text-xl" />
      ) : (
        <AiOutlinePlus className="text-xl" />
      )}
      <div style={{ marginTop: 8 }}>
        {uploading ? 'Yuklanmoqda...' : 'Yuklash'}
      </div>
    </div>
  );

  return (
    // <ImgCrop rotate modalTitle="Rasmni kesish">   // crop kerak bo'lsa oching
    <Upload
      listType="picture-card"
      fileList={fileList}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      maxCount={1}
      accept="image/*"
      showUploadList={{
        showPreviewIcon: true,
        showRemoveIcon: true,
      }}
    >
      {fileList.length >= 1 || initialUrl ? null : uploadButton}

      {initialUrl && fileList.length === 0 && (
        <img src={initialUrl} alt="preview" style={{ width: '100%' }} />
      )}
    </Upload>
    // </ImgCrop>
  );
};

export default ImageUploader;