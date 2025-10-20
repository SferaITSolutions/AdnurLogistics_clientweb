"use client";
import React from "react";
import Image from "next/image";
import BgImage from "@/assets/images/auth/Group 48097120.png";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";

export default function SignInUI() {
  const navigate = useRouter();
  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        <Image src={BgImage} alt="bg" className="max-h-screen object-cover" />
        <div className="flex flex-col items-start justify-center gap-6 min-h-screen px-8">
          <h1 className="text-2xl font-bold mb-4">Kirish</h1>
          <Form
            name="sign-in"
            layout="vertical"
            className="w-full max-w-[350px]"
            autoComplete="off"
          >
            <Form.Item
              label="Telefon raqamingiz"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Iltimos, telefon raqamingizni kiriting!",
                },
                {
                  pattern: /^[A-Za-z\u0400-\u04FF\s]+$/,
                  message: "Faqat harflar kiritilishi mumkin",
                },
              ]}
            >
              <Input
                placeholder="Telefon raqamingiz"
                onKeyPress={(e) => {
                  const char = e.key;
                  if (!/^[A-Za-z\u0400-\u04FF\s]$/.test(char)) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              label="Parol"
              name="password"
              rules={[
                { required: true, message: "Iltimos, parolni kiriting!" },
              ]}
            >
              <Input.Password placeholder="Parol" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                onClick={() => navigate.push("/client/dashboard")}
              >
                Kirish
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
