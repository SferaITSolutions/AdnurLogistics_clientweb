import { useCreateProduct } from '@/entities/hooks/products-hooks/hooks';
import ImageUploader from '@/shared/components/dump/ui/image-upload';
import { Button, Form, Input, Modal, Radio, Switch, message } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleFinish = (values: any) => {
    // values ichida imgUrl bo'lishi kerak (ImageUploader to'g'ri ulangan bo'lsa)
    // console.log("Formdan kelgan values:", values); // ← BU YERNI TEKSHIRING!

    createProduct(values, {
      onSuccess: () => {
        message.success("Hizmat turi muvaffaqiyatli qo'shildi");
        form.resetFields();
        onClose();
        onSuccess?.();
      },
      onError: (err) => {
        message.error("Xatolik yuz berdi: " + (err.message || "Noma'lum xato"));
        console.error("Create product error:", err);
      },
    });
  };

  return (
    <Modal
      title={<span className="text-xl font-bold">Yangi mahsulot qo'shish</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ calculateKg: false }}
        validateTrigger={['onChange', 'onBlur']}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', gap: 16 }}>
          <div className="flex flex-col gap-2">
            <Form.Item
              name="nameUz"
              label="Nomi (UZ)"
              rules={[
                { required: true, message: "O'zbekcha nom majburiy!" },
                { min: 2, message: 'Kamida 2 ta belgi bo‘lishi kerak' },
                { max: 120, message: '120 ta belgidan oshmasligi kerak' },
                { whitespace: true, message: "Bo'sh joy bilan boshlanib yoki tugashi mumkin emas" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="descriptionUz"
              label="Ta'rif (UZ)"
              rules={[{ max: 1500, message: 'Maksimal 1500 ta belgi' }]}
            >
              <TextArea rows={3} placeholder="Mahsulot haqida qisqacha ma'lumot..." showCount maxLength={1500} />
            </Form.Item>
          </div>

          <div className="flex flex-col gap-2">
            <Form.Item
              name="nameRu"
              label="Nomi (RU)"
              rules={[
                { required: true, message: 'Русское название обязательно!' },
                { min: 2, message: 'Минимум 2 символа' },
                { max: 120, message: 'Не более 120 символов' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="descriptionRu" label="Ta'rif (RU)" rules={[{ max: 1500 }]}>
              <TextArea rows={3} showCount maxLength={1500} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-2">
            <Form.Item
              name="nameEn"
              label="Nomi (EN)"
              rules={[
                { required: true, message: 'English name is required!' },
                { min: 2, message: 'Minimum 2 characters' },
                { max: 120, message: 'Maximum 120 characters' },
                {
                  pattern: /^[a-zA-Z0-9\s\-&'.,()]+$/,
                  message: 'Faqat ingliz harflari, raqamlar va ba‘zi belgilarga ruxsat berilgan',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="descriptionEn" label="Ta'rif (EN)" rules={[{ max: 1500 }]}>
              <TextArea rows={3} showCount maxLength={1500} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-2">
            <Form.Item
              name="nameZh"
              label="Nomi (ZH)"
              rules={[
                { required: true, message: '中文名称必填！' },
                { min: 1, message: '至少 1 个字符' },
                { max: 100, message: '最多 100 个字符' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="descriptionZh" label="Ta'rif (ZH)" rules={[{ max: 1500 }]}>
              <TextArea rows={3} showCount maxLength={1500} />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-2">
            <Form.Item
              name="nameTr"
              label="Nomi (TR)"
              rules={[
                { required: true, message: 'Türkçe isim zorunlu!' },
                { min: 2, message: 'En az 2 karakter' },
                { max: 120, message: 'En fazla 120 karakter' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="descriptionTr" label="Ta'rif (TR)" rules={[{ max: 1500 }]}>
              <TextArea rows={3} showCount maxLength={1500} />
            </Form.Item>
          </div>
          <div style={{ marginTop: 24 }}>
            <Form.Item
              name="imgUrl"
              label="Hizmat uchun rasm"
              className='!w-full flex'
              // Agar rasm majburiy bo'lishini xohlasangiz quyidagi qatorni oching:
              // rules={[{ required: true, message: 'Rasm yuklash majburiy!' }]}
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve(); // ixtiyoriy bo‘lsa shunday
                    if (typeof value !== 'string' || !value.startsWith('http')) {
                      // console.log('image xatomi nimadur karoche ');

                      return Promise.reject(new Error('To‘g‘ri rasm URL kiritilmagan'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <ImageUploader
                onUploadSuccess={(url: any) => {
                  // console.log("img uploaded ->",url);
                  form.setFieldsValue({ imgUrl: url });
                }}
                // initialUrl={...} → agar edit modalida bo'lsa ishlatiladi
                maxSizeMB={5}
              // uploadPath="products" → agar backend path kutsa qo‘shing
              />
            </Form.Item>
          </div>
        </div>

        {/* ← Bu yerda ImageUploader ishlatilmoqda */}


        <Form.Item  name="calculateKg" label="Hisoblash turi?" valuePropName="checked">
          <Radio.Group className='flex flex-col gap-2'>
            <Radio value={true}>Og‘irlik (kg) bo‘yicha</Radio>
            <Radio value={false}>Hajm (m³) bo‘yicha</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item style={{ marginTop: 32, textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 12 }}>
            Bekor qilish
          </Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Qo‘shish
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;