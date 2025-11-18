import { TranslationsType } from "../types/locales";
import { z } from "zod";

export const registerSchema = (t: TranslationsType, param?: string) => {
  function getPhoneRegex(status: string) {
    console.log(status);
    
    if (status === "+998") {
      // 🇺🇿 O'zbekiston raqamlar: 9xx xxx xx xx
      return /^9\d{11}$/;
    } else if (status === "+90") {
      // 🇹🇷 Turkiya raqamlar: 5xx xxx xx xx
      return /^\d{10}$/;
    } else {
      return /^\d{9,10}$/;
    }
  }

  return z
    .object({
      fullname: z.string({ error: t("Schemas.name.required") }).min(5, {
        message: t("Schemas.minString", { min: 5 }),
      }),
      phone: z
        .string({
          error: t("Schemas.number"),
        })
        // .regex(getPhoneRegex(param || ""), {
        //   message: t(
        //     param === "+998"
        //       ? "Schemas.numberFormat"
        //       : "Schemas.turkishNumberFormat"
        //   ),
        // })
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
      repeatedPassword: z.string({ error: t("Schemas.required") }).min(1, {
        message: t("Schemas.minString", { min: 8 }),
      }),
    })
    .refine((data) => data.password === data.repeatedPassword, {
      message: t("Schemas.passwordMismatch"),
      path: ["repeatedPassword"], // Указывает, где показать ошибку
    });
};

export type RegisterSchemaType = z.infer<ReturnType<typeof registerSchema>>;
