"use client";

import { deformatPhone, deformatPhoneTR } from "@/shared/utils/formatter";
import { Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { FaInfoCircle, FaSpinner } from "react-icons/fa";

import { Link } from "@/i18n/routing";
import { useRegisterMutation } from "@/services/auth/hook";
import { ButtonPrimary } from "@/shared/components/dump/atoms";
import SelectBefore from "@/shared/components/dump/atoms/select-before";
import { registerSchema } from "@/shared/schemas/registerSchema";
import { useGlobalStore } from "@/shared/store/globalStore";
import { extractErrorMessage } from "@/shared/utils";
import { setLocalItem } from "@/shared/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { z } from "zod";
import RegisterErrorlabel from "../molecules/errorLabel";
import { useRegisterStore } from "../store/registerStore";

export default function RegisterForm() {
  const t = useTranslations();
  const { nextStep, step } = useRegisterStore();
  const { beforePhone } = useGlobalStore();

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
      phone: "",
      fullname: "",
      password: "",
      repeatedPassword: "",
    },
  });

  const handleNext = () => {
    nextStep();
    setLocalItem("stepKey", step + 1);
  };

  // ✅ Submit
  const onSubmit = (values: z.infer<typeof schema>) => {
    const { phone, ...data } = values;
    const cleanData = {
      ...data,
      phone:
        beforePhone === "+998" ? deformatPhone(phone) : deformatPhoneTR(phone),
    };
    registerMutation.mutate(cleanData, {
      onSuccess: () => handleNext(),
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
        <Form.Item
          label={
            <span className="global-label-size">{t("register.phone")}</span>
          }
          validateStatus={errors.phone ? "error" : ""}
          help={errors.phone?.message}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                addonBefore={<SelectBefore />}
                placeholder={
                  beforePhone === "+998" ? "90 123 45 67" : "123 123 1234"
                }
                size="large"
              />
            )}
          />
        </Form.Item>

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
