"use client";

import React from "react";
import { Form, Input, Select, Button, message } from "antd";
import { useCreateLocation } from "@/entities/hooks/Locations/hooks";

const { TextArea } = Input;
const { Option } = Select;

interface LocationFormValues {
  name: string;
  nameEn: string;
  nameTr: string;
  nameRu: string;
  nameZh: string;
  description?: string;
  type: "FROM" | "TO";
}

export default function CreateLocations({ onSuccess, onCancel }: any) {
  const [form] = Form.useForm();
  const { mutate: createLocation, isPending } = useCreateLocation();
  const onFinish = (values: LocationFormValues) => {
    const payload = {
      name: values.name.trim(),
      nameTr: values.nameTr.trim(),
      nameEn: values.nameEn.trim(),
      nameRu: values.nameRu.trim(),
      nameZh: values.nameZh.trim(),
      description: values.description?.trim() || null,
      type: values.type,
    };

    createLocation(payload, {
      onSuccess: () => {
        message.success("Joylashuv muvaffaqiyatli qo'shildi!");
        form.resetFields();
        onSuccess?.(); // ← BU YERDA MODAL YOPILADI!
      },
      onError: (error) => {
        message.error("Joylashuv qo'shishda xatolik yuz berdi");
        console.error("Create location error:", error);
      },
    });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        type: "FROM",
      }}
      autoComplete="off"
    >
      {/* Nomi */}
      <Form.Item
        label="Joylashuv nomi UZ (O'zbekcha)"
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
      <Form.Item
        label="Joylashuv nomi EN (Ingilizcha)"
        name="nameEn"
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
      <Form.Item
        label="Joylashuv nomi RU (Ruscha)"
        name="nameRu"
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
      <Form.Item
        label="Joylashuv nomi (TR)"
        name="nameTr"
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
      <Form.Item
        label="Joylashuv nomi ZH(Hitoycha)"
        name="nameZh"
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
        rules={[{ required: true, message: "Joylashuv turini tanlang!" }]}
      >
        <Select size="large" placeholder="Turini tanlang" disabled={isPending}>
          <Option value="FROM">From (Jo'nash joyi)</Option>
          <Option value="TO">To (Borish joyi)</Option>
        </Select>
      </Form.Item>

      {/* Submit tugmasi */}
      <Form.Item className="mb-0 text-right">
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          size="large"
          disabled={isPending}
        >
          {isPending ? "Saqlanmoqda..." : "Joylashuvni qo'shish"}
        </Button>
      </Form.Item>
    </Form>
  );
}
