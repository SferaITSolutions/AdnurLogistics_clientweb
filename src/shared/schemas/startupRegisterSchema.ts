import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const startupRegisterSchema = (t: TranslationsType) => {
  return z
    .object({
      // fullname: z.string().min(1, { message: t("Schemas.fullname.required") }),
      name: z.string().min(1, { message: t("Schemas.name.required") }),
      email: z.string().email({ message: t("Schemas.email") }),
      short_description: z
        .string()
        .min(1, { message: t("Schemas.description.required") })
        .max(200, { message: t("Schemas.description.short") })
      ,
      description: z
        .string()
        .min(1, { message: t("Schemas.description.required") })
        .max(1000, { message: t("Schemas.description.long") })
      ,
      industry: z.string({ required_error: t("Schemas.required") }),
      stage: z.string({ required_error: t("Schemas.required") }),
      presentation: z
        .instanceof(File)
        .refine((file) => file.type === "application/pdf", {
          message: t("Schemas.presentation.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.presentation.max_size"),
        }).or(z.string()),
      logo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
          message: t("Schemas.logo.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.logo.max_size"),
        }).or(z.string()),
      contact: z.string().min(1, { message: "t('Schemas.contact.required')" }),
      link: z.string().url({ message: t("Schemas.link.invalid") }),
      investment_required: z.string().refine(
        (value) => {
          const num = parseFloat(value);
          return !isNaN(num) && num >= 0;
        },
        { message: t("Schemas.investment_required.nonnegative") }
      ),
      reason: z.string().min(1, { message: t("Schemas.reason.required") }),
      country: z.string({ required_error: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      address: z.string({ required_error: t("Schemas.required") }),
      is_member: z.boolean({ required_error: t("Schemas.is_member.required") }),
      certificate: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.certificate.max_size"),
        })
        .optional().or(z.string()),
      terms: z
        .boolean({ required_error: "This field is required" })
        .refine((value) => value === true, {
          message: "Please, accept the terms and conditions",
        }),
    })
    .refine(
      (data) => {
        if (data.is_member) {
          return data.certificate !== undefined;
        }
        return true;
      },
      {
        message: t("Schemas.certificate.required"),
        path: ["certificate"],
      }
    );
};

export type StartupRegisterSchemaType = z.infer<
  ReturnType<typeof startupRegisterSchema>
>;
