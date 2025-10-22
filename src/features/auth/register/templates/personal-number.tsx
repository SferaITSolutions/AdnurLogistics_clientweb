"use client";
import { Form, InputNumber, Button, Input } from "antd";
import { useRegisterStore } from "../store/registerStore";
import { ButtonPrimary } from "@/shared/components/dump/atoms";
import { useCheckIdentityMutation } from "@/services/auth/hook";
import { useState } from "react";
import { extractErrorMessage } from "@/shared/utils";
import { FaInfoCircle } from "react-icons/fa";
import RegisterErrorlabel from "../molecules/errorLabel";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { identitySchema } from "@/shared/schemas/identitySchema";
import z from "zod";

export default function PersonalNumber() {
  const t = useTranslations();

  const { nextStep } = useRegisterStore();
  const checkCheckIdentity = useCheckIdentityMutation()
  const [checkintertityErrorMessage, setCheckintertityErrorMessage] = useState('')
  const schema = identitySchema(t)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      code: "",
    },
  });

  const onFinish = (value: { code: string }) => {
    console.log(value);

    checkCheckIdentity.mutate(value.code, {
      onSuccess: () => nextStep(),
      onError: (err) => setCheckintertityErrorMessage(err),
    })
  };

  return (
    <div className="w-full max-w-md">
      <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Form.Item
          label="Shaxsiy raqamingiz"
          name="code"
          validateStatus={errors.code ? "error" : ""}
          help={errors.code?.message}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="fullname"
                className="!h-12 !rounded-2xl"
              />
            )}
          />

          {checkintertityErrorMessage && <div className="mb-5">
            <RegisterErrorlabel icon={<FaInfoCircle />} variant='error' text={extractErrorMessage(checkintertityErrorMessage)} onClose={() => setCheckintertityErrorMessage('')} closable />
          </div>}

        </Form.Item>
        <ButtonPrimary type="primary" label={' Davom etish'} classNameDy="w-full justify-center" />
      </Form>
    </div>
  );
}
