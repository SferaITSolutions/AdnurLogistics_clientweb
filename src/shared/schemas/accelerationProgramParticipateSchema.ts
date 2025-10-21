import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const accelerationProgramParticipateSchema = (t: TranslationsType) => {
  return z
    .object({
      email: z.string({ required_error: t("Schemas.email") }).email({ message: t("Schemas.email") }),
      fullname: z.string({ required_error: t("Schemas.fullname.required") }).min(3, { message: t("Schemas.fullname.minLength") }),
      name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
      contact: z.string({ required_error: t('Schemas.contact.required') }).min(1, { message: t('Schemas.contact.required') }),
      description: z
        .string({ required_error: t("Schemas.description.required") })
        .min(1, { message: t("Schemas.description.required") })
        .max(150, { message: t("Schemas.description.dynamic_max", { length: 150 }) }),
      // previous_projects: z
      //   .string({ required_error: t("Schemas.description.required") })
      //   .min(10, { message: t("Schemas.description.min") })
      //   .max(150, { message: t("Schemas.description.dynamic_max", { length: 150 }) }).optional(),
      industry: z.string({ required_error: t("Schemas.required") }),
      stage: z.string({ required_error: t("Schemas.required") }),
      link: z.string({ required_error: t("Schemas.link.invalid") }).url({ message: t("Schemas.link.invalid") }).optional(),
      video: z.string({ required_error: t("Schemas.link.invalid") }).url({ message: t("Schemas.link.invalid") }).optional(),
      country: z.string({ required_error: t("Schemas.required") }),
      revenu_2024: z.string({ required_error: t("Schemas.required") }),
      revenu_2025: z.string({ required_error: t("Schemas.required") }),
      logo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
          message: t("Schemas.logo.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.logo.max_size"),
        }).optional()
        .refine((file) => file || file === "", {
          message: t("Schemas.logo.invalid_type"),
        }).or(z.string()),
      presentation: z
        .instanceof(File)
        .refine((file) => file.type === "application/pdf", {
          message: t("Schemas.presentation.invalid_type"),
        })
        .refine((file) => file.size <= 15 * 1024 * 1024, {
          message: t("Schemas.presentation.max_size_15"),
        }).optional()
        .refine((file) => file || file === "", {
          message: t("Schemas.presentation.invalid_type"),
        }).or(z.string()),
      telegram: z.string({ required_error: t("Schemas.required") }),
      how_hear: z.string({ required_error: t("Schemas.required") }).optional(),
    })
};

export type AccelerationProgramParticipateSchemaType = z.infer<
  ReturnType<typeof accelerationProgramParticipateSchema>
>;
