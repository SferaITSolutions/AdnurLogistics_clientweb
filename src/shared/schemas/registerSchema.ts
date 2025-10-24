import { z } from 'zod';
import { TranslationsType } from '../types/locales';

export const registerSchema = (t: TranslationsType, param?: string) => {
  const phoneRegex = /^(?:\+998\s|\+90\s)?\d{2,3}\s\d{3}\s\d{2}\s\d{2}$/;

  return z
    .object({
      fullname: z.string({ error: t('Schemas.name.required') }).min(5, {
        message: t('Schemas.minString', { min: 5 }),
      }),
      phone: z
        .string({
          error: t('Schemas.number'),
        })
        .regex(phoneRegex, {
          message: t(param === '+998' ? 'Schemas.numberFormat' : 'Schemas.turkishNumberFormat'),
        })
        .min(1, { message: t('Schemas.numberRequired') }),
      password: z
        .string({ error: t('Schemas.required') })
        .min(1, {
          message: t('Schemas.minString', { min: 8 }),
        })
        .regex(/[A-Z]/, { message: t('Schemas.passwordUppercase') })
        .regex(/[a-z]/, { message: t('Schemas.passwordLowercase') })
        .regex(/[0-9]/, { message: t('Schemas.passwordNumber') })
        .regex(/[@$!%*?&]/, { message: t('Schemas.passwordSpecial') }),
      repeatedPassword: z.string({ error: t('Schemas.required') }).min(1, {
        message: t('Schemas.minString', { min: 8 }),
      }),
    })
    .refine((data) => data.password === data.repeatedPassword, {
      message: t('Schemas.passwordMismatch'),
      path: ['repeatedPassword'], // Указывает, где показать ошибку
    });
};

export type RegisterSchemaType = z.infer<ReturnType<typeof registerSchema>>;
