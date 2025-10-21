"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, Input, message } from "antd";
import { ButtonPrimary } from "@/shared/components/dump/atoms";
import { useLoginMutation } from "@/services/auth/hook";
import { loginSchema } from "@/shared/schemas/loginSchema";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BgImage from "@/assets/images/auth/Group 48097120.png";

export default function SignInUI() {
  const t = useTranslations();
  const navigate = useRouter();
  const loginMutation = useLoginMutation();

  // Zod schema orqali validatsiya
  const schema = loginSchema(t);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '998',
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    loginMutation.mutate(values, {
      onSuccess: () => navigate.push("/client/dashboard"),
      onError: (err) => message.error(err.message), 
    });
  };

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
        <h1></h1>
        {/* ✅ React Hook Form + AntD */}
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="w-full max-w-[350px]">
          {/* Telefon */}
          <Form.Item
            label="Telefon raqamingiz"
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone?.message}
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="+998901234567"
                  className="!h-12 !rounded-2xl"
                />
              )}
            />
          </Form.Item>

          {/* Parol */}
          <Form.Item
            label="Parol"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Parol"
                  className="!h-12 !rounded-2xl"
                />
              )}
            />
          </Form.Item>

          {/* Tugma */}
          <Form.Item>
            <ButtonPrimary
              classNameDy="w-full justify-center"
              type="primary"
              label={loginMutation.isPending ? "Kirish..." : "Kirish"}
              // htmlType="submit"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
