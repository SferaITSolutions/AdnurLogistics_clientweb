'use client'

import React, { useEffect, useState } from 'react'
import { Modal, Select, Form, message, Input } from 'antd'
import { useEntityIds, useUpdateUserEntity } from '@/services/users/hook'

interface UpdateEntitiesProps {
  user: any; // Tahrirlanayotgan foydalanuvchi
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function UpdateEntities({ user, open, onCancel, onSuccess }: UpdateEntitiesProps) {
  const [form] = Form.useForm();

  // console.log(user);
  
  const value = form.getFieldValue('entityIds')
  const { mutate: updateEntity, isPending } = useUpdateUserEntity(
    user?.userId, 
  );
  // console.log(typeof user?.userId,33);
  
  // Modal ochilganda formani foydalanuvchi ma'lumotlari bilan to'ldirish 
  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        entityIds: user.entityIds || []
      });
    }
  }, [open, user, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      updateEntity(undefined, {
        onSuccess: () => {
          message.success("Muvaffaqiyatli yangilandi");
          onSuccess();
          onCancel();
        },
        onError: () => {
          message.error("Xatolik yuz berdi");
        }
      });
    });
  };
  // const options = entitiesData?.result?.ids?.map((item: any) => ({
  //   label: item.name, 
  //   value: item.id
  // })) || [];

  return (
    <Modal
      title={`${user?.fullname} - manzillarini tahrirlash`}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={isPending}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="entityIds"
          label="Yuk tashish manzillari"
          rules={[{ required: true, message: 'Oracle Id kiriting!' }]}
        >
          <Input
            placeholder='Yangi oracle ID kiriting (RN-123)'
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}