import { Form } from 'antd';
import ImageUploader from '@/shared/components/dump/ui/image-upload';

interface ProductImageUploadFieldProps {
  form: any;
  initialUrl?: string;
}

/**
 * Rasm yuklash Form.Item + ImageUploader.
 * CreateProductModal va EditProductModal da ishlatiladi.
 */
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
        <ImageUploader
          onUploadSuccess={(url) => form.setFieldsValue({ imgUrl: url })}
          initialUrl={initialUrl}
          maxSizeMB={5}
        />
      </Form.Item>
    </div>
  );
};

export default ProductImageUploadField;