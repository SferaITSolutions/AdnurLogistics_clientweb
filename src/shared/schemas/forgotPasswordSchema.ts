import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const forgotPasswordSchema = (t: TranslationsType) => {
  return z.object({
    email: z.string({ error: t("Schemas.email") }).email({
      message: t("Schemas.email"),
    }),
  });
};
