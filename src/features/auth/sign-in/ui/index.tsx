"use client";
import React from "react";
import Image from "next/image";
import BgImage from "@/assets/images/auth/Group 48097120.png";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { ButtonPrimary, ButtonSecondary } from "@/shared/components/dump/atoms";

export default function SignInUI() {
  const navigate = useRouter();
  return (
    <div className="flex justify-between gap-10 min-h-screen">
      <Image
        src={BgImage}
        alt="bg"
        className="max-h-screen w-1/2 object-cover"
        priority
      />
      <div className="flex flex-col justify-center items-center w-1/2 p-10 relative overflow-hidden">
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
              className="!h-12 !rounded-2xl"
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
            <Input.Password className="!h-12 !rounded-2xl" placeholder="Parol" />
          </Form.Item>
          <Form.Item>
            <ButtonPrimary
              classNameDy="w-full justify-center"
              type="primary"
              onClick={() => { navigate.push("/client/dashboard") }}
              label={'Kirish'}
            >
            </ButtonPrimary>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
