import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const InvestorTypeEnum = (t: TranslationsType) =>
  z.enum(["venture", "angel", "private"], {
    errorMap: () => ({ message: t("Schemas.investor_type.invalid") }),
  });

export const RegionTypeEnum = (t: TranslationsType) =>
  z.enum(
    [
      "andijon",
      "buxoro",
      "fargona",
      "jizzax",
      "qashqadaryo",
      "xorazm",
      "namangan",
      "navoiy",
      "samarqand",
      "sirdaryo",
      "surxandaryo",
      "tashkent",
      "tashkent_city",
      "qoraqalpogiston",
    ],
    {
      errorMap: () => ({ message: t("Schemas.region.invalid") }),
    }
  );
