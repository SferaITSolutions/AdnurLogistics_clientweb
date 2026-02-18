// components/organisms/CreateProductModal.tsx

import { useCreateProduct } from '@/entities/hooks/products-hooks/hooks';
import { Button, Form, Modal, message } from 'antd';
import ProductNameInputs from '@/shared/modules/products/molecules/ProductNameInputs';
import ProductDescriptionInputs from '@/shared/modules/products/molecules/ProductDescriptionInputs';
import ProductImageUploadField from '@/shared/modules/products/molecules/ProductImageUploadField';
import CalculateKgField from '@/shared/modules/products/molecules/CalculateKgField';

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateProductModal = ({ open, onClose, onSuccess }: CreateProductModalProps) => {
  const [form] = Form.useForm();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleFinish = (values: any) => {
    createProduct(values, {
      onSuccess: () => {
        message.success("Hizmat turi muvaffaqiyatli qo'shildi");
        form.resetFields();
        onClose();
        onSuccess?.();
      },
      onError: (err) => {
        message.error('Xatolik yuz berdi: ' + (err.message || "Noma'lum xato"));
        console.error('Create product error:', err);
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
        <ProductNameInputs />
        <ProductImageUploadField form={form} />
        <CalculateKgField />
        <ProductDescriptionInputs />

        <Form.Item style={{ marginTop: 32, textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 12 }}>
            Bekor qilish
          </Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Qo'shish
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;  