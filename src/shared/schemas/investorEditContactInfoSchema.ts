import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const investorEditContactInfoSchema = (t: TranslationsType) => {
  return z
    .object({
      link: z.string().url({ message: t("Schemas.link.invalid") }).optional(),
      email: z.string().email({ message: t("Schemas.email") }).optional(),
      linkedin: z.string().url({ message: t("Schemas.link.invalid") }).optional(),
      contacts: z.string().min(1, { message: t("Schemas.contacts.required") }).optional(),
      address: z.string({ required_error: t("Schemas.required") }).optional(),
    })
};

export type InvestorEditContactSchemaType = z.infer<
  ReturnType<typeof investorEditContactInfoSchema>
>;
