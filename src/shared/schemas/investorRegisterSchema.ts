import { z } from "zod";
import { TranslationsType } from "../types/locales";
import { InvestorTypeEnum } from "./indexSchema";

export const investorRegisterSchema = (t: TranslationsType) => {
  return z.object({
    industries: z
      .array(z.string())
      .min(1, { message: t("Schemas.industries.min") })
      .nonempty({ message: t("Schemas.industries.nonempty") }),
    name: z
      .string()
      .min(2, { message: t("Schemas.name.min") }),
    email: z
      .string()
      .email({ message: t("Schemas.email") }),
    description: z
      .string()
      .min(10, { message: t("Schemas.description.min") })
      .max(1000, { message: t("Schemas.description.max") }),
    photo:
      z.instanceof(File)
        .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
          message: t("Schemas.logo.invalid_type"),
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: t("Schemas.photo.invalid"),
        }).or(z.string()),
    link: z.string().url({ message: t("Schemas.link.invalid") }),
    stages: z
      .array(z.string())
      .min(1, { message: t("Schemas.stages.min") })
      .nonempty({ message: t("Schemas.stages.nonempty") }),
    contacts: z.string().min(5, { message: t("Schemas.contacts.min") }),
    investment_amount_from: z
      .string()
      .min(1, { message: t("Schemas.investment_amount.min") }),
    investment_amount_till: z
      .string()
      .min(1, { message: t("Schemas.investment_amount.min") }),
    country: z.string({ required_error: t("Schemas.required") }).optional(),
    region: z.string({ required_error: t("Schemas.required") }),
  });
};

export type InvestorRegisterSchemaType = z.infer<
  ReturnType<typeof investorRegisterSchema>
>;
