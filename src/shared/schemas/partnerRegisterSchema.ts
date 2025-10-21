import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const partnerRegisterSchema = (t: TranslationsType) => {
  return z
    .object({
      fullname: z.string().min(1, { message: t("Schemas.fullname.required") }),
      contact: z.string().min(1, { message: "t('Schemas.contact.required')" }),
      email: z.string().email({ message: t("Schemas.email") }),
      description: z
        .string()
        .min(1, { message: t("Schemas.description.required") }),
      industry: z.string({ required_error: t("Schemas.required") }),
      photo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
          message: t("Schemas.logo.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.logo.max_size"),
        }).or(z.string()),
      terms: z
        .boolean({ required_error: "This field is required" })
        .refine((value) => value === true, {
          message: "Please, accept the terms and conditions",
        }),
      country: z.string({ required_error: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
    })
};

export type PartnerRegisterSchemaType = z.infer<
  ReturnType<typeof partnerRegisterSchema>
>;
