import { Form, FormInstance, Input } from 'antd';
import ProductImageUploadField from './ProductImageUploadField';

const { TextArea } = Input;

/**
 * Barcha tillar uchun nom + tavsif maydonlari.
 * Har bir til uchun nom va tavsif yonma-yon joylashadi.
 */
const ProductLanguageFields = (form: any) => {
  return (
    <div className="space-y-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* O'zbekcha */}
      <div className="flex flex-col gap-4">
        <Form.Item
          name="nameUz"
          label="Nomi (O'zbekcha)"
          rules={[
            { required: true, message: "O'zbekcha nom majburiy" },
            { min: 2, message: 'Kamida 2 ta belgi' },
            { max: 120, message: '120 ta belgidan oshmasligi kerak' },
          ]}
        >
          <Input placeholder="Masalan: Oq non" size="large" />
        </Form.Item>

        <Form.Item
          name="descriptionUz"
          label="Ta'rif (O'zbekcha)"
          rules={[{ max: 1500, message: 'Maksimal 1500 ta belgi' }]}
        >
          <TextArea
            rows={3}
            showCount
            maxLength={1500}
            placeholder="Mahsulot haqida batafsil..."
          />
        </Form.Item>
      </div>

      {/* Русский */}
      <div className="flex flex-col gap-4">
        <Form.Item
          name="nameRu"
          label="Nomi (Русский)"
          rules={[
            { required: true, message: 'Русское название обязательно' },
            { min: 2, message: 'Минимум 2 символа' },
            { max: 120, message: 'Не более 120 символов' },
          ]}
        >
          <Input placeholder="Например: Белый хлеб" size="large" />
        </Form.Item>

        <Form.Item
          name="descriptionRu"
          label="Ta'rif (Русский)"
          rules={[{ max: 1500 }]}
        >
          <TextArea rows={3} showCount maxLength={1500} />
        </Form.Item>
      </div>

      {/* English */}
      <div className="flex flex-col gap-4">
        <Form.Item
          name="nameEn"
          label="Nomi (English)"
          rules={[
            { required: true, message: 'English name is required' },
            { min: 2, message: 'Minimum 2 characters' },
            { max: 120, message: 'Maximum 120 characters' },
          ]}
        >
          <Input placeholder="Example: White bread" size="large" />
        </Form.Item>

        <Form.Item
          name="descriptionEn"
          label="Description (English)"
          rules={[{ max: 1500 }]}
        >
          <TextArea rows={3} showCount maxLength={1500} />
        </Form.Item>
      </div>

      {/* 中文 */}
      <div className="flex flex-col gap-4">
        <Form.Item
          name="nameZh"
          label="Nomi (中文)"
          rules={[
            { required: true, message: '中文名称必填' },
            { min: 1, message: '至少 1 个字符' },
            { max: 100, message: '最多 100 个字符' },
          ]}
        >
          <Input placeholder="例如：白面包" size="large" />
        </Form.Item>

        <Form.Item
          name="descriptionZh"
          label="描述 (中文)"
          rules={[{ max: 1500 }]}
        >
          <TextArea rows={3} showCount maxLength={1500} />
        </Form.Item>
      </div>

      {/* Türkçe */}
      <div className="flex flex-col gap-4">
        <Form.Item
          name="nameTr"
          label="Nomi (Türkçe)"
          rules={[
            { required: true, message: 'Türkçe isim zorunlu' },
            { min: 2, message: 'En az 2 karakter' },
            { max: 120, message: 'En fazla 120 karakter' },
          ]}
        >
          <Input placeholder="Örnek: Beyaz ekmek" size="large" />
        </Form.Item>

        <Form.Item
          name="descriptionTr"
          label="Açıklama (Türkçe)"
          rules={[{ max: 1500 }]}
        >
          <TextArea rows={3} showCount maxLength={1500} />
        </Form.Item>
      </div>
      <div className="">
      <ProductImageUploadField form={form} />
      </div>
    </div>
  );
};

export default ProductLanguageFields;