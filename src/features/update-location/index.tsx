"use client";

import React, { useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { useUpdateLocation } from "@/entities/hooks/Locations/hooks";

const { TextArea } = Input;
const { Option } = Select;

interface UpdateLocationFormProps {
  id: string;
  initialValues: {
    name: string;
    description: string | null;
    type: "FROM" | "TO";
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function UpdateLocationForm({
  id,
  initialValues,
  onSuccess,
  onCancel,
}: UpdateLocationFormProps) {
  const [form] = Form.useForm();
  const { mutate: updateLocation, isPending } = useUpdateLocation();

  useEffect(() => {
    form.setFieldsValue({
      name: initialValues.name,
      description: initialValues.description || "",
      type: initialValues.type,
    });
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    const payload = {
      id,
      name: values.name.trim(),
      description: values.description?.trim() || null,
      type: values.type,
    };

    updateLocation(payload, {
      onSuccess: () => {
        message.success("Joylashuv muvaffaqiyatli yangilandi!");
        onSuccess?.();
      },
      onError: (error) => {
        message.error("Yangilashda xatolik yuz berdi");
        console.error("Update error:", error);
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      preserve={false} // modal yopilganda form tozalanadi
    >
      {/* Nomi */}
      <Form.Item
        label="Joylashuv nomi"
        name="name"
        rules={[
          { required: true, message: "Joylashuv nomini kiriting!" },
          { whitespace: true, message: "Faqat bo'sh joy kiritib bo'lmaydi!" },
          {
            min: 2,
            message: "Nom kamida 2 ta belgidan iborat bo'lishi kerak",
          },
          {
            max: 100,
            message: "Nom 100 ta belgidan oshmasligi kerak",
          },
          {
            pattern: /^[a-zA-Z0-9\s.,\-'’]+$/u,
            message:
              "Faqat harf, raqam, bo'shliq, nuqta, vergul, chiziqcha va tirnoqqa ruxsat beriladi",
          },
        ]}
        tooltip="Masalan: Toshkent markazi, Samarqand aeroporti"
      >
        <Input
          placeholder="Masalan: Toshkent markazi"
          size="large"
          maxLength={100}
          allowClear
        />
      </Form.Item>

      {/* Tavsif */}
      <Form.Item
        label="Tavsif (ixtiyoriy)"
        name="description"
        rules={[
          {
            max: 500,
            message: "Tavsif 500 ta belgidan oshmasligi kerak",
          },
          {
            whitespace: true,
            message: "Faqat bo'sh joy kiritib bo'lmaydi (agar to'ldirsangiz)",
          },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Bu joylashuv haqida qo'shimcha ma'lumot..."
          maxLength={500}
          showCount
          allowClear
        />
      </Form.Item>

      {/* Joylashuv turi */}
      <Form.Item
        label="Joylashuv turi"
        name="type"
        rules={[
          { required: true, message: "Joylashuv turini tanlang!" },
        ]}
      >
        <Select size="large" disabled={isPending}>
          <Option value="FROM">From (Jo'nash joyi)</Option>
          <Option value="TO">To (Borish joyi)</Option>
        </Select>
      </Form.Item>

      {/* Tugmalar */}
      <Form.Item className="mb-0 text-right">
        <div className="flex justify-end gap-3 mt-6">
          {onCancel && (
            <Button 
              onClick={onCancel} 
              disabled={isPending}
            >
              Bekor qilish
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={isPending}
          >
            {isPending ? "Yangilanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}