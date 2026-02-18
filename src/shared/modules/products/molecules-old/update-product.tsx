"use client";

import { useUpdateProduct } from '@/entities/hooks/products-hooks/hooks'; // o'zingizning yo'lingizga moslang
import ImageUploader from '@/shared/components/dump/ui/image-upload';
import { Button, Form, Input, Modal, Switch, message } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;

interface Product {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  nameZh: string;
  nameTr: string;
  descriptionUz: string;
  descriptionRu: string;
  descriptionEn: string;
  descriptionZh: string;
  descriptionTr: string;
  imgUrl: string | null;
  calculateKg: boolean;
}

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccess?: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  product,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  // Modal ochilganda formani to'ldirish
  useEffect(() => {
    if (open && product) {
      form.setFieldsValue({
        nameUz: product.nameUz || '',
        nameRu: product.nameRu || '',
        nameEn: product.nameEn || '',
        nameZh: product.nameZh || '',
        nameTr: product.nameTr || '',
        descriptionUz: product.descriptionUz || '',
        descriptionRu: product.descriptionRu || '',
        descriptionEn: product.descriptionEn || '',
        descriptionZh: product.descriptionZh || '',
        descriptionTr: product.descriptionTr || '',
        imgUrl: product.imgUrl || undefined,
        calculateKg: product.calculateKg ?? false,
      });
    } else {
      form.resetFields();
    }
  }, [open, product, form]);

  const handleFinish = (values: any) => {
    if (!product?.id) {
      message.error("Mahsulot ID topilmadi");
      return;
    }

    const finalData = {
      ...values,
      id: product.id,
      imgUrl: values.imgUrl || null, // agar rasm o'zgarmasa → eski qiymat saqlanadi yoki null
    };

    // console.log("Update uchun yuborilayotgan data:", finalData);

    updateProduct(finalData, {
      onSuccess: () => {
        message.success("Mahsulot muvaffaqiyatli yangilandi");
        form.resetFields();
        onClose();
        onSuccess?.();
      },
      onError: (err: any) => {
        message.error("Yangilashda xato: " + (err.message || "Noma'lum xato"));
      },
    });
  };

  return (
    <Modal
      title={<span className="text-xl font-bold">Mahsulotni tahrirlash</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        validateTrigger={['onChange', 'onBlur']}
      >
        {/* Nomlar — 5 ta til */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Form.Item
            name="nameUz"
            label="Nomi (O‘zbekcha)"
            rules={[
              { required: true, message: "O'zbekcha nom majburiy" },
              { min: 2, message: "Kamida 2 ta belgi" },
              { max: 120, message: "120 ta belgidan oshmasligi kerak" },
            ]}
          >
            <Input placeholder="Masalan: Oq non" />
          </Form.Item>

          <Form.Item
            name="nameRu"
            label="Nomi (Русский)"
            rules={[
              { required: true, message: "Русское название обязательно" },
              { min: 2, message: "Минимум 2 символа" },
              { max: 120, message: "Не более 120 символов" },
            ]}
          >
            <Input placeholder="Например: Белый хлеб" />
          </Form.Item>

          <Form.Item
            name="nameEn"
            label="Nomi (English)"
            rules={[
              { required: true, message: "English name is required" },
              { min: 2, message: "Minimum 2 characters" },
              { max: 120, message: "Maximum 120 characters" },
            ]}
          >
            <Input placeholder="Example: White bread" />
          </Form.Item>

          <Form.Item
            name="nameZh"
            label="Nomi (中文)"
            rules={[
              { required: true, message: "中文名称必填" },
              { min: 1, message: "至少 1 个字符" },
              { max: 100, message: "最多 100 个字符" },
            ]}
          >
            <Input placeholder="例如：白面包" />
          </Form.Item>

          <Form.Item
            name="nameTr"
            label="Nomi (Türkçe)"
            rules={[
              { required: true, message: "Türkçe isim zorunlu" },
              { min: 2, message: "En az 2 karakter" },
              { max: 120, message: "En fazla 120 karakter" },
            ]}
          >
            <Input placeholder="Örnek: Beyaz ekmek" />
          </Form.Item>
        </div>

        {/* Rasm yuklash */}
        <div className="mb-8">
          <Form.Item
            name="imgUrl"
            label="Mahsulot rasmi"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value) return Promise.resolve();
                  if (typeof value !== 'string' || !value.trim().startsWith('http')) {
                    return Promise.reject(new Error('To‘g‘ri rasm URL kiritilmagan'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <ImageUploader
              onUploadSuccess={(url) => form.setFieldsValue({ imgUrl: url })}
              initialUrl={form.getFieldValue('imgUrl') || product?.imgUrl}
              maxSizeMB={5}
            />
          </Form.Item>
        </div>

        {/* Og‘irlik bo‘yicha hisoblash */}
        <Form.Item
          name="calculateKg"
          label="Og‘irlik bo‘yicha hisoblanadimi?"
          valuePropName="checked"
        >
          <Switch checkedChildren="Ha" unCheckedChildren="Yo‘q" />
        </Form.Item>

        {/* Ta'riflar — 5 ta til */}
        <h4 className="font-bold text-xl mt-10 mb-4">Ta'riflar (ixtiyoriy)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            name="descriptionUz"
            label="Ta'rif (O‘zbekcha)"
            rules={[{ max: 1500, message: 'Maksimal 1500 ta belgi' }]}
          >
            <TextArea rows={4} showCount maxLength={1500} placeholder="Mahsulot haqida batafsil..." />
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

        {/* Tugmalar */}
        <Form.Item className="mt-10 text-right">
          <Button onClick={onClose} className="mr-3">
            Bekor qilish
          </Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;