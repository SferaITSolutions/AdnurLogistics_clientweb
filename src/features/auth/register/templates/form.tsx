"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ButtonPrimary, ButtonOutline } from "@/shared/components/dump/atoms";
import { useRegisterStore } from "../store/registerStore";
import { useError } from "@/shared/hooks/useError";
import { useTranslations } from "next-intl";
import { useRegisterMutation } from "@/services/auth/hook";
import { registerSchema, RegisterSchemaType } from "@/shared/schemas/registerSchema";
import { useRouter } from "next/navigation";




export default function RegisterForm() {
  const t = useTranslations();
  const { nextStep, prevStep } = useRegisterStore();
  const handleError = useError();
  const navigate = useRouter();

  const [apiError, setApiError] = useState<string>("");
  const schema = registerSchema(t);
  const registerMutation = useRegisterMutation()
  const [registerErrorMessage, setRegisterErrorMessage] = useState('')
  const [isPending, setIsPending] = useState('')

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });


  // ✅ Submit
  const onSubmit = (values: RegisterSchemaType) => {
    setApiError("");

    registerMutation.mutate(values, {
      onSuccess: () => navigate.push("/client/dashboard"),
      onError: (err) => setRegisterErrorMessage(err),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Hush kelibsiz 😊</h1>

      {/* {apiError && (
        <OutlineText
          text={apiError}
          variant="error"
          closable
          onClose={() => setApiError("")}
          className="w-full mb-4"
        />
      )} */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div>
          <label className="block font-medium mb-1">Ism Familyangiz</label>
          <input
            {...register("fullname")}
            placeholder="Ismingiz"
            className="w-full border rounded-2xl px-3 h-12 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Telefon raqamingiz</label>
          <input
            {...register("phone")}
            placeholder="+998901234567"
            maxLength={13}
            className="w-full border rounded-2xl px-3 h-12 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Parol</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Parol"
            className="w-full border rounded-2xl px-3 h-12 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 mt-3">
          <ButtonOutline
            label="Ortga"
            onClick={prevStep}
            classNameDy="w-1/2 justify-center"
          />
          <ButtonPrimary
            type="primary"
            label={isPending ? "Yuborilmoqda..." : "Shaxsiy raqam olish"}
            classNameDy="w-1/2 justify-center"
          />
        </div>
      </form>
    </div>
  );
}
