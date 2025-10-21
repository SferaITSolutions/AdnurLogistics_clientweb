import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const mentorRegisterSchema = (t: TranslationsType) => {
  return z
    .object({
      fullname: z.string().min(1, { message: t("Schemas.fullname.required") }),
      contact: z.string().min(1, { message: "t('Schemas.contact.required')" }),
      email: z.string().email({ message: t("Schemas.email") }),
      short_description: z.string({ required_error: t("Schemas.required") })
        .max(200, { message: t("Schemas.description.short") }),
      description: z
        .string()
        .min(1, { message: t("Schemas.description.required") })
        .max(1000, { message: t("Schemas.description.long") }),
      industry: z.string({ required_error: t("Schemas.required") }),
      country: z.string({ required_error: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      photo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
          message: t("Schemas.photo.invalid"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.photo.invalid"),
        }).or(z.string()),
      linkedin: z.string().url({ message: t("Schemas.link.invalid") }),
      terms: z
        .boolean({ required_error: "This field is required" })
        .refine((value) => value === true, {
          message: "Please, accept the terms and conditions",
        }),
    })
};

export type MentorRegisterSchemaType = z.infer<
  ReturnType<typeof mentorRegisterSchema>
>;
