"use client";

import { Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { FaInfoCircle, FaSpinner } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { useRegisterMutation } from "@/services/auth/hook";
import { ButtonPrimary } from "@/shared/components/dump/atoms";
import { registerSchema } from "@/shared/schemas/registerSchema";
import { extractErrorMessage } from "@/shared/utils";
import { setLocalItem } from "@/shared/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import RegisterErrorlabel from "../molecules/errorLabel";
import { useRegisterStore } from "../store/registerStore";
import { useGlobalStore } from "@/shared/store/globalStore";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const t = useTranslations();
  const { nextStep, step } = useRegisterStore();
  const { beforePhone } = useGlobalStore();
  const router = useRouter();

  const registerMutation = useRegisterMutation();
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const schema = registerSchema(t, beforePhone);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      password: "",
      repeatedPassword: "",
    },
  });

  const handleNext = () => {
    nextStep();
    setLocalItem("stepKey", step + 1);
  };

  // Telefon raqami OTP'da saqlangan (sessionStorage'da)
  const phone_number = typeof window !== "undefined" ? sessionStorage.getItem("register_phone") : "";

  // Submit
  const onSubmit = (values: z.infer<typeof schema>) => {
    const { fullname, password, repeatedPassword } = values;
    // phone ni sessionStorage'dan olib, cleanData objektiga kiritamiz
    const cleanData = {
      fullname,
      password,
      repeatedPassword,
      phone: phone_number, // phone number ishtirokida yuboriladi
    };
    registerMutation.mutate(cleanData, {
      onSuccess: () => {
        handleNext();
        router.push("/client/dashboard");
      },
      onError: (err) => setRegisterErrorMessage(err),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4">{t("register.welcome")}</h1>

      {registerErrorMessage && (
        <div className="mb-5">
          <RegisterErrorlabel
            icon={<FaInfoCircle />}
            variant="error"
            text={extractErrorMessage(registerErrorMessage)}
            onClose={() => setRegisterErrorMessage("")}
            closable
          />
        </div>
      )}

      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 w-full"
      >
        <Form.Item
          label={
            <span className="global-label-size">{t("register.name")}</span>
          }
          validateStatus={errors.fullname ? "error" : ""}
          help={errors.fullname?.message}
        >
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input
                className="global-input-height"
                {...field}
                placeholder={t("register.name")}
                size="large"
              />
            )}
          />
        </Form.Item>

        {/* Telefon inputi bu yerda bo'lmasligi kerak! */}

        <Form.Item
          label={
            <span className="global-label-size">{t("register.password")}</span>
          }
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder={t("register.password")}
                size="large"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="global-label-size">
              {t("register.repeatPassword")}
            </span>
          }
          validateStatus={errors.repeatedPassword ? "error" : ""}
          help={errors.repeatedPassword?.message}
        >
          <Controller
            name="repeatedPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder={t("register.repeatPassword")}
                size="large"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <ButtonPrimary
            type="primary"
            Icon={
              registerMutation.isPending && (
                <FaSpinner className="animate-spin text-blue-500" />
              )
            }
            label={t("register.getId")}
            classNameDy="w-full justify-center"
            disabled={registerMutation.isPending}
          />
        </Form.Item>
      </Form>
      <p className="underline text-blue-500 text-sm">
        <Link href="/auth/log-in">{t("register.alreadyRegistered")}</Link>
      </p>
    </div>
  );
}
