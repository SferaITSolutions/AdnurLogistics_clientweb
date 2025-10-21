import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const comunityProfileEditSchema = (t: TranslationsType) => {
  return z
    .object({
      fullname: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      name: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      position: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      country: z.string().min(1, { message: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      logo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
          message: t("Schemas.logo_edit_profile.invalid_type"),
        }) 
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.logo_edit_profile.max_size"),
        }).or(z.string()).optional().nullable(),

    })
};

export const comunityContactInfoEditSchema = (t: TranslationsType) => {
  return z
    .object({
      link: z.string().url({ message: t("Schemas.link.invalid") }).optional(),
      email: z.string().email({ message: t("Schemas.email") }).optional(),
      contact: z.string().min(1, { message: t("Schemas.contact.required") }).optional(),
      linkedin: z.string().url({ message: t("Schemas.linkedin.required") }).optional(),
    })
}

export type ComunityProfileEditSchema = z.infer<ReturnType<typeof comunityProfileEditSchema>>;
export type ComunityContactInfoEditSchema = z.infer<ReturnType<typeof comunityContactInfoEditSchema>>;
