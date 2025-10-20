"use client";
import { Form, InputNumber, Button, Input } from "antd";
import { useRegisterStore } from "../store/registerStore";
import { ButtonPrimary } from "@/shared/components/dump/atoms";

export default function PersonalNumber() {
  const [form] = Form.useForm();
  const { nextStep } = useRegisterStore();

  const onFinish = () => {
    nextStep();
  };

  return (
    <div className="w-full max-w-md">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Shaxsiy raqamingiz"
          name="personalNumber"
          rules={[
            { required: true, message: "Iltimos, shaxsiy raqamingizni kiriting" },
            { pattern: /^\d+$/, message: "Faqat raqamlar kiriting" },
          ]}
        >
          <InputNumber
            className="!py-3 !rounded-2xl"
            placeholder="Shaxsiy raqamingiz"
            style={{ width: "100%" }}
            controls={false}
          />
        </Form.Item>
        <ButtonPrimary type="primary" label={' Davom etish'} classNameDy="w-full justify-center"/>
      </Form>
    </div>
  );
}
