import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const updatePartnerProfileSchema = (t: TranslationsType) => {
  return z
    .object({
      fullname: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      description: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      industry: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      short_description: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      country: z.string().min(1, { message: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      photo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
          message: t("Schemas.logo.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.logo.max_size"),
        }).or(z.string()).optional().nullable(),
    })
};

export const updatePartnerContactInfo = (t: TranslationsType) => {
  return z
    .object({
      email: z.string().email({ message: t("Schemas.email") }).optional(),
      contact: z.string().min(1, { message: t("Schemas.contact.required") }).optional(),
      linkedin: z.string().url({ message: t("Schemas.linkedin.required") }).optional(),
    })
}

export const updatePartnerNewsSchema = (t: TranslationsType) => {
  return z.object({
    title: z.string().min(1, { message: t("Schemas.required") }),
    short_description: z.string().min(1, { message: t("Schemas.required") }),
    content: z.string().min(1, { message: t("Schemas.required") }),
    image: z
      .instanceof(File)
      .refine((file) => ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type), {
        message: t("Schemas.logo.invalid_type"),
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t("Schemas.logo.max_size"),
      })
      .or(z.string())
      .optional()
      .nullable(),

    tags: z
      .array(
        z.object({
          name: z.string(),
        })
      )
      .default([]),
  });
};




export type UpdatePartnerProfileSchema = z.infer<ReturnType<typeof updatePartnerProfileSchema>>;
export type UpdatePartnerContactInfo = z.infer<ReturnType<typeof updatePartnerContactInfo>>;
export type UpdatePartnerNewsSchema = z.infer<ReturnType<typeof updatePartnerNewsSchema>>;
