import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const startupVerifySchema = (t: TranslationsType) => {
  return z.object({
    tax_report: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t("Schemas.tax_report.max_size"),
      })
      .nullable(),
    accelerator_name: z.string().min(1, { message: t("Schemas.name.required") }),
    passed_date: z.string().min(1, { message: t("Schemas.name.required") }),
    accelerator_pass_certificate: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t("Schemas.tax_report.max_size"),
      })
      .nullable(),
    business_model: z
      .string()
      .min(1, { message: t("Schemas.legal_name.required") })
  });
};

export type StartupVerifySchemaType = z.infer<
  ReturnType<typeof startupVerifySchema>
>;
