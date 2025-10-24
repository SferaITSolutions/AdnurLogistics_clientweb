import { TranslationsType } from '../types/locales';
import { z } from 'zod';

export const resetPasswordSchema = (t: TranslationsType) =>
  z
    .object({
      password: z
        .string()
        .min(1, { message: t('Schemas.required') })
        .min(8, { message: t('Schemas.minString', { min: 8 }) })
        .regex(/[A-Z]/, { message: t('Schemas.passwordUppercase') })
        .regex(/[a-z]/, { message: t('Schemas.passwordLowercase') })
        .regex(/[0-9]/, { message: t('Schemas.passwordNumber') })
        .regex(/[@$!%*?&]/, { message: t('Schemas.passwordSpecial') }),

      confirmPassword: z
        .string()
        .min(1, { message: t('Schemas.required') })
        .min(8, { message: t('Schemas.minString', { min: 8 }) }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('Schemas.passwordMismatch'),
      path: ['confirmPassword'],
    });

export type ResetPasswordSchemaType = z.infer<ReturnType<typeof resetPasswordSchema>>;
