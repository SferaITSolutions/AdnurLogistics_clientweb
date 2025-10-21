import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const startupEditSchema = (t: TranslationsType) => {
  return z
    .object({
      fullname: z.string().min(1, { message: t("Schemas.fullname.required") }).optional(),
      name: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      email: z.string().email({ message: t("Schemas.email") }).optional(),
      description: z
        .string()
        .min(1, { message: t("Schemas.description.required") }).optional(),
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
        }).optional().nullable(),
      contact: z.string().min(1, { message: "t('Schemas.contact.required')" }).optional(),
      link: z.string().url({ message: t("Schemas.link.invalid") }).optional(),
      investment_required: z.string().refine(
        (value) => {
          const num = parseFloat(value);
          return !isNaN(num) && num >= 0;
        },
        { message: t("Schemas.investment_required.nonnegative") }
      ).optional(),
      reason: z.string().min(1, { message: t("Schemas.reason.required") }).optional(),
      legal_name: z
        .string()
        .min(1, { message: t("Schemas.legal_name.required") }).optional(),
      country: z.string({ required_error: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      // tax_report: z
      //   .instanceof(File)
      //   .refine((file) => file.size <= 5 * 1024 * 1024, {
      //     message: t("Schemas.tax_report.max_size"),
      //   }).optional().nullable(),
      is_member: z.boolean({ required_error: t("Schemas.is_member.required") }).optional(),
      certificate: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.certificate.max_size"),
        })
        .optional().nullable(),
    })
    .refine(
      (data) => {
        if (data.is_member) {
          return data.certificate !== undefined || data.certificate === null;
        }
        return true;
      },
      {
        message: t("Schemas.certificate.required"),
        path: ["certificate"],
      }
    );
};

export type StartupEditSchemaType = z.infer<
  ReturnType<typeof startupEditSchema>
>;
