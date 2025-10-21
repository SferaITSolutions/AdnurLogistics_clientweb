import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const acceleratorAndIncubatorRegisterSchema = (t: TranslationsType) => {
  return z
    .object({
      industries: z
        .array(z.string())
        .min(1, { message: t("Schemas.industries.min") })
        .nonempty({ message: t("Schemas.industries.nonempty") }),
      stages: z
        .array(z.string())
        .min(1, { message: t("Schemas.stages.min") })
        .nonempty({ message: t("Schemas.stages.nonempty") }),
      email: z.string().email({ message: t("Schemas.email") }),

      name: z.string().min(2, { message: t("Schemas.name.min") }),
      account_type: z.string({ required_error: t("Schemas.required") }),
      description: z
        .string()
        .min(10, { message: t("Schemas.description.min") })
        .max(1000, { message: t("Schemas.description.max") }),
      logo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
          message: t("Schemas.logo.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.logo.max_size"),
        }).or(z.string()),
      contact: z.string().min(5, { message: t("Schemas.contacts.min") }),
      link: z.string().url({ message: t("Schemas.link.invalid") }),
      legal_name: z
        .string()
        .min(2, { message: t("Schemas.minString", { min: 2 }) }),
      country: z.string({ required_error: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      is_member: z.boolean({ required_error: t("Schemas.required") }),
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
        message: t("Schemas.required"),
        path: ["certificate"],
      }
    );
};

export type AcceleratorAndIncubatorRegisterSchemaType = z.infer<
  ReturnType<typeof acceleratorAndIncubatorRegisterSchema>
>;
