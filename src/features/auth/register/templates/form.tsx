"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { useRegisterStore } from "../store/registerStore";
import { ButtonOutline, ButtonPrimary } from "@/shared/components/dump/atoms";

export default function RegisterForm() {
  const [form] = Form.useForm();
  const { nextStep, prevStep } = useRegisterStore();

  const onFinish = (values: any) => {
    console.log("Register form:", values);
    nextStep();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Hush kelibsiz 😊</h1>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onFinish}
        className="w-full"
        autoComplete="off"
      >
        <Form.Item
          label="Ismingiz"
          name="name"
          rules={[{ required: true, message: "Ismingizni kiriting!" }]}
        >
          <Input className="!h-12 !rounded-2xl" placeholder="Ismingiz" />
        </Form.Item>
        <Form.Item
          label="Familyangiz"
          name="surname"
          rules={[{ required: true, message: "Familyangizni kiriting!" }]}
        >
          <Input className="!h-12 !rounded-2xl" placeholder="Familyangiz" />
        </Form.Item>
        <Form.Item
          label="Telefon raqamingiz"
          name="phone"
          rules={[
            { required: true, message: "Telefon raqamni kiriting!" },
            {
              pattern: /^\+998\d{9}$/,
              message:
                "Telefon raqam +998901234567 ko'rinishida bo'lishi kerak.",
            },
          ]}
        >
          <Input className="!h-12 !rounded-2xl" placeholder="+998901234567" maxLength={13} />
        </Form.Item>
        <Form.Item
          label="Parol"
          name="password"
          rules={[{ required: true, message: "Parolni kiriting!" }]}
        >
          <Input.Password className="!h-12 !rounded-2xl" placeholder="Parol" />
        </Form.Item>
        <div className="flex gap-3 mt-2">
          <ButtonPrimary type="primary" label="Shaxsiy raqam olish" onClick={prevStep} classNameDy="w-full justify-center" />
        </div>
      </Form>
    </div>
  );
}
