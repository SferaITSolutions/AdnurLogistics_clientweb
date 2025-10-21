import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const startupEditInformationSchema = (t: TranslationsType) => {
  return z
    .object({
      name: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      country: z.string({ required_error: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      short_description: z
        .string()
        .min(1, { message: t("Schemas.description.required") })
        .max(200, { message: t("Schemas.description.short") }).optional(),
      description: z
        .string()
        .min(1, { message: t("Schemas.description.required") })
        .max(1200, { message: t("Schemas.description.long") }).optional(),
      industry: z.string({ required_error: t("Schemas.required") }).optional(),
      stage: z.string({ required_error: t("Schemas.required") }).optional(),
      presentation: z
        .instanceof(File)
        .refine((file) => file.type === "application/pdf", {
          message: t("Schemas.presentation.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.presentation.max_size"),
        }).optional().nullable(),
      logo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
          message: t("Schemas.logo.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.logo.max_size"),
        }).or(z.string()).optional().nullable(),
      investment_required: z.string().refine(
        (value) => {
          const num = parseFloat(value);
          return !isNaN(num) && num >= 0;
        },
        { message: t("Schemas.investment_required.nonnegative") }
      ).optional(),
      reason: z.string().min(1, { message: t("Schemas.reason.required") }).optional(),
    })
};

export type StartupEditInformationSchemaType = z.infer<
  ReturnType<typeof startupEditInformationSchema>
>;
