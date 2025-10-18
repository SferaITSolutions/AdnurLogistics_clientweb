"use client";

import { Modal, Input, Form, Button, message, Select, Checkbox } from "antd";
import { useState } from "react";
import { useApplyModalStore } from "../model/useApplyModalStore";
import { sendApplyRequest } from "../lib/sendApplyRequest";
import { ApplyRequest } from "@/shared/types/lenging-page-types";
import { TitleText } from "@/shared/modules/lending-page";

export const ApplyModal = () => {
  const { open, setOpen } = useApplyModalStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = async (values: ApplyRequest) => {
    setLoading(true);
    try {
      await sendApplyRequest(values);
      message.success("Arizangiz muvaffaqiyatli yuborildi ✅");
      form.resetFields();
      setOpen(false);
    } catch {
      message.error("Xatolik yuz berdi. Qayta urinib ko‘ring ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
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
            name="name"
            className="flex-1"
            rules={[
              { required: true, message: "Ismni kiriting!" },
              {
                pattern: /^[A-Za-z\u0400-\u04FF\s'-]+$/,
                message: "Faqat harflardan foydalaning!",
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
            initialValue="+998"
            rules={[
              { required: true, message: "Telefon raqamni kiriting!" },
              {
                pattern: /^\+998\d{9}$/,
                message: "Telefon raqam noto‘g‘ri formatda",
              },
            ]}
          >
            <Input placeholder="+998 90 123 45 67" maxLength={13} />
          </Form.Item>
        </div>
        {/* From & To - second row */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label="Qayerdan"
            name="from"
            className="flex-1"
            rules={[{ required: true, message: "Qayerdan!" }]}
          >
            <Select
              placeholder="Qayerdan"
              options={[
                { label: "Toshkent", value: "Toshkent" },
                { label: "Samarqand", value: "Samarqand" },
                { label: "Bukhara", value: "Bukhara" },
                { label: "Navoiy", value: "Navoiy" },
                { label: "Namangan", value: "Namangan" },
                { label: "Fergana", value: "Fergana" },
                { label: "Andijon", value: "Andijon" },
                { label: "Jizzax", value: "Jizzax" },
                { label: "Qashqadaryo", value: "Qashqadaryo" },
                { label: "Surxandaryo", value: "Surxandaryo" },
                { label: "Sirdaryo", value: "Sirdaryo" },
                { label: "Tashkent", value: "Tashkent" },
                { label: "Xorazm", value: "Xorazm" },
                { label: "Qoraqalpog'iston", value: "Qoraqalpog'iston" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Qayergacha"
            name="to"
            className="flex-1"
            rules={[{ required: true, message: "Qayergacha!" }]}
          >
            <Select
              placeholder="Qayergacha"
              options={[
                { label: "Toshkent", value: "Toshkent" },
                { label: "Samarqand", value: "Samarqand" },
                { label: "Bukhara", value: "Bukhara" },
                { label: "Navoiy", value: "Navoiy" },
                { label: "Namangan", value: "Namangan" },
                { label: "Fergana", value: "Fergana" },
                { label: "Andijon", value: "Andijon" },
                { label: "Jizzax", value: "Jizzax" },
                { label: "Qashqadaryo", value: "Qashqadaryo" },
                { label: "Surxandaryo", value: "Surxandaryo" },
                { label: "Sirdaryo", value: "Sirdaryo" },
                { label: "Tashkent", value: "Tashkent" },
                { label: "Xorazm", value: "Xorazm" },
                { label: "Qoraqalpog'iston", value: "Qoraqalpog'iston" },
              ]}
            />
          </Form.Item>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label="Hajmi  (m3)"
            name="volume"
            className="flex-1"
            rules={[{ required: true, message: "Hajmi (m3)!" }]}
          >
            <Input placeholder="Hajmi (m3)" />
          </Form.Item>
          <Form.Item
            label="Ogirligi (KG)"
            name="weight"
            className="flex-1"
            rules={[{ required: true, message: "Ogirligi (KG)!" }]}
          >
            <Input placeholder="Ogirligi (KG)" />
          </Form.Item>
        </div>
        {/* Message */}
        <Form.Item
          label="Zichlik  (Kg/m3)"
          name="density"
          rules={[{ required: true, message: "Zichlik (Kg/m3)!" }]}
        >
          <Input placeholder="Zichlik  (Kg/m3)" />
        </Form.Item>

        <Form.Item
          label="Xabar"
          name="message"
          rules={[{ required: true, message: "Xabar matnini kiriting!" }]}
        >
          <Input.TextArea rows={3} placeholder="Xabaringiz..." />
        </Form.Item>
        <Form.Item
          //   label="Shaxsiy ma'lumotlarimni qayta ishlashga roziman"
          name="isAgree"
          rules={[{ required: true, message: "Rozi bo'lish shart" }]}
        >
          <Checkbox>Shaxsiy ma'lumotlarimni qayta ishlashga roziman</Checkbox>
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
        >
          Yuborish
        </Button>
      </Form>
    </Modal>
  );
};
