import { useTranslations } from "next-intl";

export enum SupportedLocales {
  "en",
  "ru",
  "uz",
}

export type TranslationsType = ReturnType<typeof useTranslations>;
