import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const updateMentorProfileSchema = (t: TranslationsType) => {
  return z
    .object({
      fullname: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      country: z.string().min(1, { message: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      short_description: z.string({ required_error: t("Schemas.required") })
        .max(200, { message: t("Schemas.description.short") }).optional(),
      description: z
        .string()
        .min(1, { message: t("Schemas.description.required") })
        .max(1200, { message: t("Schemas.description.long") }).optional(),
      photo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
          message: t("Schemas.photo.invalid"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.photo.invalid"),
        }).or(z.string()).optional().nullable(),
    })
};

export const updateMentorContactInfo = (t: TranslationsType) => {
  return z
    .object({
      email: z.string().email({ message: t("Schemas.email") }).optional(),
      contact: z.string().min(1, { message: t("Schemas.contact.required") }).optional(),
      linkedin: z.string().url({ message: t("Schemas.linkedin.required") }).optional(),
    })
}



export type UpdateMentorProfileSchema = z.infer<ReturnType<typeof updateMentorProfileSchema>>;
export type UpdateMentorContactInfo = z.infer<ReturnType<typeof updateMentorContactInfo>>;
