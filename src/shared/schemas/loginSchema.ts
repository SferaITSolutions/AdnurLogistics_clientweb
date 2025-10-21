import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const loginSchema = (t: TranslationsType) => {
  return z.object({
    email: z.string({ required_error: t("Schemas.email") }).email({
      message: t("Schemas.email"),
    }),
    password: z
      .string({ required_error: t("Schemas.required") })
      .min(1, {
        message: t("Schemas.minString", { min: 8 }),
      })
      .regex(/[A-Z]/, { message: t("Schemas.passwordUppercase") })
      .regex(/[a-z]/, { message: t("Schemas.passwordLowercase") })
      .regex(/[0-9]/, { message: t("Schemas.passwordNumber") })
      .regex(/[@$!%*?&]/, { message: t("Schemas.passwordSpecial") }),
  });
};

export type LoginSchemaType = z.infer<ReturnType<typeof loginSchema>>;
