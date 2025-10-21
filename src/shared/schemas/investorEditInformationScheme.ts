import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const InvestorEditInformationScheme = (t: TranslationsType) => {
  return z.object({
    photo: z
      .instanceof(File)
      .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
        message: t("Schemas.logo.invalid_type"),
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t("Schemas.logo.max_size"),
      }).or(z.string()).optional().nullable(),
    presentation: z
      .instanceof(File)
      .superRefine((file, ctx) => {
        if (file.type !== "application/pdf") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Only PDF format is allowed",
          });
        }
        if (file.size > 5 * 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File size must be 5MB or less",
          });
        }
      }).optional()
      .or(z.string())
      .optional()
      .nullable(),
    name: z.string().min(2, { message: t("Schemas.name.min") }).optional(),
    country: z.string({ required_error: t("Schemas.required") }).optional(),
    region: z.string({ required_error: t("Schemas.required") }).optional(),
    short_description: z.string().min(10, { message: t("Schemas.description.min") }).optional(),
    industries: z
      .array(z.string())
      .min(1, { message: t("Schemas.industries.min") })
      .nonempty({ message: t("Schemas.industries.nonempty") }).optional(),
    stages: z
      .array(z.string())
      .min(1, { message: t("Schemas.stages.min") })
      .nonempty({ message: t("Schemas.stages.nonempty") }).optional(),
    investment_amount_from: z.string().min(1, { message: t("Schemas.investment_amount.min") }).optional(),
    investment_amount_till: z.string().min(1, { message: t("Schemas.investment_amount.min") }).optional(),
  });
};

export type investorEditInformationType = z.infer<
  ReturnType<typeof InvestorEditInformationScheme>
>;
