import { z } from 'zod';
import { TranslationsType } from '../types/locales';

export const loginSchema = (t: TranslationsType) => {
  const phoneRegex = /^(?:\+998\s|\+90\s)?\d{2,3}\s\d{3}\s\d{2}\s\d{2}$/;
  return z.object({
    phone: z
      .string({
        error: t('Schemas.number'),
      })
      .regex(phoneRegex, { message: t('Schemas.numberFormat') })
      .min(1, { message: t('Schemas.numberRequired') }),
    password: z
      .string({
        error: t('Schemas.required'),
      })
      .min(5, {
        message: t('Schemas.minString', { min: 5 }),
      }),
    // .regex(/[a-z]/, { message: t("Schemas.passwordLowercase") })
    // .regex(/[0-9]/, { message: t("Schemas.passwordNumber") })
    // .regex(/[@$!%*?&]/, { message: t("Schemas.passwordSpecial") }),
  });
};

export type LoginSchemaType = z.infer<ReturnType<typeof loginSchema>>;
