// ProductImageUploadField.tsx
import { Form } from 'antd';
import ImageUploader from '@/shared/components/dump/ui/image-upload';

interface ProductImageUploadFieldProps {
  form: any;
  initialUrl?: string;
}

const ProductImageUploadField = ({ form, initialUrl }: ProductImageUploadFieldProps) => {
  return (
    <div className="mb-8 !w-full !min-w-full">
      <Form.Item
        name="imgUrl"
        label="Mahsulot rasmi"
        rules={[
          {
            validator: async (_, value) => {
              if (!value) return Promise.resolve();
              if (typeof value !== 'string' || !value.trim().startsWith('http')) {
                return Promise.reject(new Error("To'g'ri rasm URL kiritilmagan"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <ImageUploaderFormWrapper
          initialUrl={initialUrl}
          maxSizeMB={5}
          form={form}
        />
      </Form.Item>
    </div>
  );
};

// Form.Item bilan to'g'ri ishlash uchun wrapper
const ImageUploaderFormWrapper = ({
  value,      // Form.Item tomonidan inject qilinadi
  onChange,   // Form.Item tomonidan inject qilinadi
  initialUrl,
  maxSizeMB,
  form,
}: any) => {
  return (
    <ImageUploader
      onUploadSuccess={(url) => {
        onChange?.(url);          // Form.Item state'ni yangilaydi ✅
        form?.setFieldsValue({ imgUrl: url }); // qo'shimcha xavfsizlik
      }}
      initialUrl={value || initialUrl}  // Form value'ni ishlatamiz
      maxSizeMB={maxSizeMB}
    />
  );
};

export default ProductImageUploadField;