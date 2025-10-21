import { z } from "zod"
import { TranslationsType } from "../types/locales"

export const eventEditSchema = (t: TranslationsType) => {
  return z.object({
    title: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
    short_description: z
      .string()
      .min(1, { message: t("Schemas.description.required") }).optional(),
    location: z.string().optional().nullable(),
    link: z.string().optional().nullable(),
    image: z
      .instanceof(File)
      .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
        message: t("Schemas.logo.invalid_type"),
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t("Schemas.logo.max_size"),
      }).optional().or(z.string()),
    date: z.string().optional(),
    date_end: z.string().optional(),
    industries: z
      .array(z.string())
      .min(1, { message: t("Schemas.industries.min") })
      .nonempty({ message: t("Schemas.industries.nonempty") }).optional(),
    stages: z
      .array(z.string())
      .min(1, { message: t("Schemas.stages.min") })
      .nonempty({ message: t("Schemas.stages.nonempty") }).optional(),
    is_program: z.boolean().optional(),
    is_online: z.boolean().optional(),
    content: z.string({ required_error: t("Schemas.required") }).optional(),
  }).refine((data) => {
    if (!data.is_online) {
      return data.location ? data.location.length > 0 : false;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["location"]
  }).refine((data) => {
    if (data.is_online) {
      return data.link ? data.link.length > 0 : false;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["link"]
  })
}

export type EventEditSchemaType = z.infer<ReturnType<typeof eventEditSchema>>;