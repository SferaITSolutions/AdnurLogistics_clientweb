import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const chatBotSchema = (t: TranslationsType) => z.object({
  text: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
  files: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: t("Schemas.presentation.invalid_type"),
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Maximum file size is 10MB.",
    })
    .optional(),
})