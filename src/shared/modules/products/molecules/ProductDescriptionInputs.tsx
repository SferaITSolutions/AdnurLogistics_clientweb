import { Form, Input } from 'antd';

const { TextArea } = Input;

/**
 * 5 ta til uchun tavsif TextArea'lari.
 * CreateProductModal va EditProductModal da ishlatiladi.
 */
const ProductDescriptionInputs = () => {
  return (
    <>
      <h4 className="font-bold text-xl mt-10 mb-4">Ta'riflar (ixtiyoriy)</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="descriptionUz"
          label="Ta'rif (O'zbekcha)"
          rules={[{ max: 1500, message: 'Maksimal 1500 ta belgi' }]}
        >
          <TextArea
            rows={4}
            showCount
            maxLength={1500}
            placeholder="Mahsulot haqida batafsil..."
          />
        </Form.Item>

        <Form.Item
          name="descriptionRu"
          label="Ta'rif (Русский)"
          rules={[{ max: 1500 }]}
        >
          <TextArea rows={4} showCount maxLength={1500} />
        </Form.Item>

        <Form.Item
          name="descriptionEn"
          label="Description (English)"
          rules={[{ max: 1500 }]}
        >
          <TextArea rows={4} showCount maxLength={1500} />
        </Form.Item>

        <Form.Item
          name="descriptionTr"
          label="Açıklama (Türkçe)"
          rules={[{ max: 1500 }]}
        >
          <TextArea rows={4} showCount maxLength={1500} />
        </Form.Item>

        <Form.Item
          name="descriptionZh"
          label="描述 (中文)"
          rules={[{ max: 1500 }]}
        >
          <TextArea rows={4} showCount maxLength={1500} />
        </Form.Item>
      </div>
    </>
  );
};

export default ProductDescriptionInputs;