"use client";

import { useUpdateProduct } from '@/entities/hooks/products-hooks/hooks';
import { Button, Form, Modal, message } from 'antd';
import { useEffect } from 'react';
import ProductNameInputs from '@/shared/modules/products/molecules/ProductNameInputs';
import ProductDescriptionInputs from '@/shared/modules/products/molecules/ProductDescriptionInputs';
import ProductImageUploadField from '@/shared/modules/products/molecules/ProductImageUploadField';
import CalculateKgField from '@/shared/modules/products/molecules/CalculateKgField';

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

const EditProductModal = ({
  open,
  onClose,
  product,
  onSuccess,
}: EditProductModalProps) => {
  const [form] = Form.useForm();
  const { mutate: updateProduct, isPending } = useUpdateProduct();

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
      message.error('Mahsulot ID topilmadi');
      return;
    }

    const finalData = {
      ...values,
      id: product.id,
      imgUrl: values.imgUrl || null,
    };

    updateProduct(finalData, {
      onSuccess: () => {
        message.success('Mahsulot muvaffaqiyatli yangilandi');
        form.resetFields();
        onClose();
        onSuccess?.();
      },
      onError: (err: any) => {
        message.error('Yangilashda xato: ' + (err.message || "Noma'lum xato"));
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
        <ProductNameInputs />
        <ProductImageUploadField form={form} initialUrl={product?.imgUrl || undefined} />
        <CalculateKgField />
        <ProductDescriptionInputs />

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