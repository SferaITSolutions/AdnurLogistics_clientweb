import { Form, Input } from 'antd';

/**
 * 5 ta til uchun nom inputlari: UZ, RU, EN, ZH, TR.
 * CreateProductModal va EditProductModal da ishlatiladi.
 */
const ProductNameInputs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <Form.Item
        name="nameUz"
        label="Nomi (O'zbekcha)"
        rules={[
          { required: true, message: "O'zbekcha nom majburiy" },
          { min: 2, message: 'Kamida 2 ta belgi' },
          { max: 120, message: '120 ta belgidan oshmasligi kerak' },
        ]}
      >
        <Input placeholder="Masalan: Oq non" />
      </Form.Item>

      <Form.Item
        name="nameRu"
        label="Nomi (Русский)"
        rules={[
          { required: true, message: 'Русское название обязательно' },
          { min: 2, message: 'Минимум 2 символа' },
          { max: 120, message: 'Не более 120 символов' },
        ]}
      >
        <Input placeholder="Например: Белый хлеб" />
      </Form.Item>

      <Form.Item
        name="nameEn"
        label="Nomi (English)"
        rules={[
          { required: true, message: 'English name is required' },
          { min: 2, message: 'Minimum 2 characters' },
          { max: 120, message: 'Maximum 120 characters' },
        ]}
      >
        <Input placeholder="Example: White bread" />
      </Form.Item>

      <Form.Item
        name="nameZh"
        label="Nomi (中文)"
        rules={[
          { required: true, message: '中文名称必填' },
          { min: 1, message: '至少 1 个字符' },
          { max: 100, message: '最多 100 个字符' },
        ]}
      >
        <Input placeholder="例如：白面包" />
      </Form.Item>

      <Form.Item
        name="nameTr"
        label="Nomi (Türkçe)"
        rules={[
          { required: true, message: 'Türkçe isim zorunlu' },
          { min: 2, message: 'En az 2 karakter' },
          { max: 120, message: 'En fazla 120 karakter' },
        ]}
      >
        <Input placeholder="Örnek: Beyaz ekmek" />
      </Form.Item>
    </div>
  );
};

export default ProductNameInputs;