import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const acceleratorProfileEditSchema = (t: TranslationsType) => {
  return z
    .object({
      fullname: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      name: z.string().min(1, { message: t("Schemas.name.required") }).optional(),
      country: z.string().min(1, { message: t("Schemas.required") }).optional(),
      region: z.string({ required_error: t("Schemas.required") }),
      logo: z
        .instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
          message: t("Schemas.logo.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.logo.max_size"),
        }).or(z.string()).optional().nullable(),
      presentation: z
        .instanceof(File)
        .superRefine((file, ctx) => {
          if (file.type !== "application/pdf") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Only PDF format is allowed",
            });
          }
          if (file.size > 5 * 1024 * 1024) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "File size must be 5MB or less",
            });
          }
        })
        .or(z.string())
        .optional()
        .nullable(),

      industries: z
        .array(z.string())
        .min(1, { message: t("Schemas.industries.min") })
        .nonempty({ message: t("Schemas.industries.nonempty") }).optional(),
      stages: z
        .array(z.string())
        .min(1, { message: t("Schemas.stages.min") })
        .nonempty({ message: t("Schemas.stages.nonempty") }).optional(),
      description: z.string().min(1, { message: t("Schemas.description.min") }).optional(),
      account_type:  z.string({ required_error: t("Schemas.required") }),
    })
};

export const acceleratorContactInfoEditSchema = (t: TranslationsType) => {
  return z
    .object({
      link: z.string().url({ message: t("Schemas.link.invalid") }).optional(),
      email: z.string().email({ message: t("Schemas.email") }).optional(),
      linkedin: z.string().url({ message: t("Schemas.linkedin.required") }).optional(),
      contact: z.string().min(1, { message: t("Schemas.contact.required") }).optional(),
      address: z.string().min(1, { message: "Location is required" }).optional(),
    })
}

// export const acceleratorEditSchema = (t: TranslationsType) => {
//   return z
//     .object({
//       industries: z
//         .array(z.string())
//         .min(1, { message: t("Schemas.industries.min") })
//         .nonempty({ message: t("Schemas.industries.nonempty") }).optional(),
//       stages: z
//         .array(z.string())
//         .min(1, { message: t("Schemas.stages.min") })
//         .nonempty({ message: t("Schemas.stages.nonempty") }).optional(),
//       email: z.string().email({ message: t("Schemas.email") }).optional(),

//       name: z.string().min(2, { message: t("Schemas.name.min") }).optional(),
//       is_incubator: z.boolean({ required_error: t("Schemas.required") }).optional(),
//       description: z
//         .string()
//         .min(10, { message: t("Schemas.description.min") }).optional(),
//       logo: z
//         .instanceof(File)
//         .refine((file) => ["image/png", "image/svg+xml"].includes(file.type), {
//           message: t("Schemas.logo.invalid_type"),
//         })
//         .refine((file) => file.size <= 5 * 1024 * 1024, {
//           message: t("Schemas.logo.max_size"),
//         }).or(z.string()).optional().nullable(),
//       contact: z.string().min(5, { message: t("Schemas.contacts.min") }).optional(),
//       link: z.string().url({ message: t("Schemas.link.invalid") }).optional(),
//       legal_name: z
//         .string()
//         .min(2, { message: t("Schemas.minString", { min: 2 }) }).optional(),
//       country: z.string({ required_error: t("Schemas.required") }).optional(),
//       region: z.string({ required_error: t("Schemas.required") }),
//       is_member: z.boolean({ required_error: t("Schemas.required") }).optional(),
//       certificate: z
//         .instanceof(File)
//         .refine((file) => file.size <= 5 * 1024 * 1024, {
//           message: t("Schemas.certificate.max_size"),
//         }).or(z.string())
//         .optional().nullable(),
//     })
//     .refine(
//       (data) => {
//         if (data.is_member) {
//           return data.certificate !== undefined;
//         }
//         return true;
//       },
//       {
//         message: t("Schemas.required"),
//         path: ["certificate"],
//       }
//     );
// };

export type AcceleratorProfileEditSchemaType = z.infer<ReturnType<typeof acceleratorProfileEditSchema>
>;
