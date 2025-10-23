'use client';

import {
  deformatPhone,
  deformatPhoneTR,
  formatPhone,
  formatPhoneTR,
} from '@/shared/utils/formatter';
import { Button, Checkbox, Form, Input, Modal, Select, message } from 'antd';

import SelectBefore from '@/shared/components/dump/atoms/select-before';
import { FROM_OPTIONS } from '@/shared/constants';
import { TitleText } from '@/shared/modules/lending-page';
import { useGlobalStore } from '@/shared/store/globalStore';
import { ApplyRequest } from '@/shared/types/lenging-page-types';
import { useEffect } from 'react';
import { useApplyRequest } from '../lib/hooks/hooks';
import { useApplyModalStore } from '../model/useApplyModalStore';

export const ApplyModal = () => {
  const { open, setOpen } = useApplyModalStore();
  const { beforePhone } = useGlobalStore();
  const applyRequest = useApplyRequest();
  const [form] = Form.useForm();
  const handleSubmit = async (values: ApplyRequest) => {
    try {
      const { phone, ...data } = values;
      const cleanData = {
        ...data,
        phone: beforePhone === '+998' ? deformatPhone(phone) : deformatPhoneTR(phone),
      };
      await applyRequest.mutateAsync(cleanData);
      message.success('Arizangiz muvaffaqiyatli yuborildi ✅');
      form.resetFields();
      setOpen(false);
    } catch {
      message.error('Xatolik yuz berdi. Qayta urinib ko‘ring ❌');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 10000);

    setInterval(() => {
      setOpen(true);
    }, 30000);
  }, []);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      footer={null}
      centered
      width={800}
      className="rounded-2xl"
    >
      <div className="py-4 mb-5">
        <TitleText title="Ariza qoldirish" />
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Name & Phone - first row */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label="Ismingiz"
            name="fullname"
            className="flex-1"
            rules={[
              { required: true, message: 'Ismni kiriting!' },
              {
                pattern: /^[A-Za-z\u0400-\u04FF\s'-]+$/,
                message: 'Faqat harflardan foydalaning!',
              },
            ]}
          >
            <Input
              placeholder="Ismingiz"
              onKeyPress={(e) => {
                const regex = /^[A-Za-z\u0400-\u04FF\s'-]$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Telefon raqamingiz"
            name="phone"
            className="flex-1"
            rules={[
              { required: true, message: 'Telefon raqamni kiriting!' },
              {
                pattern: /^(?:\+998\s|\+90\s)?\d{2,3}\s\d{3}\s\d{2}\s\d{2}$/,
                message: `Telefon raqam formati: ${
                  beforePhone === '+998' ? '+998 90 123 45 67' : '+90 123 123 1234'
                }`,
              },
            ]}
          >
            <Input
              addonBefore={<SelectBefore />}
              placeholder={beforePhone === '+998' ? '90 123 45 67' : '123 123 1234'}
              onChange={(e) => {
                form.setFieldsValue({
                  phone:
                    beforePhone === '+998'
                      ? formatPhone(e.target.value, true)
                      : formatPhoneTR(e.target.value, true),
                });
              }}
            />
          </Form.Item>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label="Qayerdan"
            name="fromLocation"
            className="flex-1"
            rules={[{ required: true, message: 'Qayerdan!' }]}
          >
            <Select placeholder="Qayerdan" options={FROM_OPTIONS} />
          </Form.Item>
          <Form.Item
            label="Qayergacha"
            name="toLocation"
            className="flex-1"
            rules={[{ required: true, message: 'Qayergacha!' }]}
          >
            <Select placeholder="Qayergacha" options={[{ label: 'Toshkent', value: 'TASHKENT' }]} />
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label="Hajmi (m3)"
            name="bulk"
            className="flex-1"
            rules={[{ required: true, message: 'Hajmi (m3)!' }]}
          >
            <Input placeholder="Hajmi (m3)" />
          </Form.Item>
          <Form.Item
            label="Ogirligi (KG)"
            name="density"
            className="flex-1"
            rules={[{ required: true, message: 'Ogirligi (KG)!' }]}
          >
            <Input placeholder="Ogirligi (KG)" />
          </Form.Item>
        </div>
        {/* Message */}
        <Form.Item
          label="Zichlik (Kg/m3)"
          name="weight"
          rules={[{ required: true, message: 'Zichlik (Kg/m3)!' }]}
        >
          <Input placeholder="Zichlik (Kg/m3)" />
        </Form.Item>

        <Form.Item
          label="Xabar"
          name="description"
          rules={[{ required: true, message: 'Xabar matnini kiriting!' }]}
        >
          <Input.TextArea rows={3} placeholder="Xabaringiz..." />
        </Form.Item>
        <Form.Item name="isAgree" rules={[{ required: true, message: "Rozi bo'lish shart" }]}>
          <Checkbox>Shaxsiy ma'lumotlarimni qayta ishlashga roziman</Checkbox>
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={applyRequest.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
        >
          Yuborish
        </Button>
      </Form>
    </Modal>
  );
};
