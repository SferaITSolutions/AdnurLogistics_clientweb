import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const identitySchema = (t: TranslationsType) => {
  return z
    .object({
      code: z
        .string({ error: t("Schemas.required") })
        .min(1, {
          message: t("Schemas.minString", { min: 8 }),
        })
    })
};

export type IdentitySchemaType = z.infer<ReturnType<typeof identitySchema>>;
