"use client";
import { Form, InputNumber, Button, Input } from "antd";
import { useRegisterStore } from "../store/registerStore";

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
          placeholder="Shaxsiy raqamingiz"
          className="w-full"
          style={{ width: "100%" }}
          controls={false}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="w-full">
        Davom etish
      </Button>
    </Form>
    </div>
  );
}
