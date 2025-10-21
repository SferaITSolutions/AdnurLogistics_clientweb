import { z } from "zod"
import { TranslationsType } from "../types/locales"

// export const addEventSchema = (t: TranslationsType) => {
//   return z.object({
//     title: z.string().min(1, { message: t("Schemas.name.required") }),
//     short_description: z
//       .string()
//       .min(1, { message: t("Schemas.description.required") }),
//     location: z.string().optional().nullable(),
//     link: z.string().optional().nullable(),
//     image: z
//       .instanceof(File)
//       .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
//         message: t("Schemas.logo.invalid_type"),
//       })
//       .refine((file) => file.size <= 5 * 1024 * 1024, {
//         message: t("Schemas.logo.max_size"),
//       }),
//     date: z.string({ required_error: t("Schemas.required") }),
//     date_end: z.string().optional(),
//     industries: z
//       .array(z.string())
//       .min(1, { message: t("Schemas.industries.min") })
//       .nonempty({ message: t("Schemas.industries.nonempty") }),
//     stages: z
//       .array(z.string())
//       .min(1, { message: t("Schemas.stages.min") })
//       .nonempty({ message: t("Schemas.stages.nonempty") }),
//     isProgram: z.boolean(),
//     is_online: z.boolean(),
//     is_international: z.boolean().optional(),
//     content: z.string({ required_error: t("Schemas.required") })
//   }).refine((data) => {
//     if (!data.is_online) {
//       return data.location ? data.location.length > 0 : false;
//     }
//     return true;
//   }, {
//     message: t("Schemas.minString", { min: 2 }),
//     path: ["location"]
//   }).refine((data) => {
//     if (data.is_online) {
//       return data.link ? data.link.length > 0 : false;
//     }
//     return true;
//   }, {
//     message: t("Schemas.minString", { min: 2 }),
//     path: ["link"]
//   })
// }

export const addEventSchema = (t: TranslationsType) => {
  return z.object({
    title: z.string().min(1, { message: t("Schemas.required") }),
    image: z
      .instanceof(File)
      .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
        message: t("Schemas.logo.invalid_type"),
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t("Schemas.photo.invalid"),
      }),
    short_description: z.string().min(1, { message: t("Schemas.required") }),
    content: z.string().optional(),
    date: z.string().min(1, { message: t("Schemas.required") }),
    date_end: z.string().min(1, { message: t("Schemas.required") }),
    industries: z.array(z.string()).min(1, { message: t("Schemas.required") }),
    stages: z.array(z.string()).min(1, { message: t("Schemas.required") }),
    is_program: z.boolean().default(false),
    is_online: z.boolean().default(false),
    is_international: z.boolean().default(false),
    is_incubation: z.boolean().default(false),
    tags: z.array(
      z.object({
        key: z.string(),
        name: z.string()
      })
    ).min(1, { message: t("Schemas.required") }),
    status: z.string().default("inactive"),
    location: z.string().optional(),
    link: z.string().optional(),
  });
}
export type AddEventSchemaType = z.infer<ReturnType<typeof addEventSchema>>;