import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const comunityMemberRegisterSchema = (t: TranslationsType) =>
  z.object({
    email: z
      .string({ required_error: t("Schemas.required") })
      .email(t("Schemas.email")),
    fullname: z
      .string({ required_error: t("Schemas.required") })
      .min(3, { message: t("Schemas.fullname.minLength") }),
    contact: z
      .string({ required_error: t("Schemas.required") })
      .min(9, { message: t("Schemas.contact.minLength") }),
    name: z
      .string({ required_error: t("Schemas.required") })
      .min(3, { message: t("Schemas.organization.minLength") }),
    position: z
      .string({ required_error: t("Schemas.required") })
      .min(1, { message: t("Schemas.position.minLength") }),
    linkedin: z
      .string()
      .optional(),
    country: z.string({ required_error: t("Schemas.required") }).optional(),
    region: z.string({ required_error: t("Schemas.required") }),
  });

export type ComunityMemberRegisterSchema = z.infer<ReturnType<typeof comunityMemberRegisterSchema>>;
