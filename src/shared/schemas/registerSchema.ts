import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const registerSchema = (t: TranslationsType) => {
  const phoneRegex = /^998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

  return z
    .object({
      fullname: z.string({ error: t("Schemas.name.required") }).email({
        message: t("Schemas.name.required"),
      }),
      phone: z
        .string({
          error: t("Schemas.number"),
        })
        .regex(phoneRegex, { message: t("Schemas.numberFormat") })
        .min(1, { message: t("Schemas.numberRequired") }),
      password: z
        .string({ error: t("Schemas.required") })
        .min(1, {
          message: t("Schemas.minString", { min: 8 }),
        })
        .regex(/[A-Z]/, { message: t("Schemas.passwordUppercase") })
        .regex(/[a-z]/, { message: t("Schemas.passwordLowercase") })
        .regex(/[0-9]/, { message: t("Schemas.passwordNumber") })
        .regex(/[@$!%*?&]/, { message: t("Schemas.passwordSpecial") }),
      confirmPassword: z
        .string({ error: t("Schemas.required") })
        .min(1, {
          message: t("Schemas.minString", { min: 8 }),
        }),
      role: z.string({ error: t("Schemas.required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("Schemas.passwordMismatch"),
      path: ["confirmPassword"], // Указывает, где показать ошибку
    });
};

export type RegisterSchemaType = z.infer<ReturnType<typeof registerSchema>>;
