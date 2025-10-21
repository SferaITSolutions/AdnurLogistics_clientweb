import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const mentorCostCoverageFormSchema = (t: TranslationsType) => {
  const fileOrString = z.union([
    z.instanceof(File),
    z.string().min(1, { message: t("Schemas.required") }),
  ]);

  return z.object({
    name: z
      .string({ required_error: t("Schemas.required") })
      .min(1, { message: t("Schemas.required") }),
    date_from: z
      .string({ required_error: t("Schemas.required") }),
    date_till: z
      .string({ required_error: t("Schemas.required") }),
    participated_startups: z
      .number()
      .min(1, { message: t("Schemas.required") }),
    sessions: z
      .number()
      .min(1, { message: t("Schemas.required") }),
    demo_day: z
      .boolean(),
    mentors_detail_text: z
      .string({ required_error: t("Schemas.required") })
      .optional(),
    mentors_detail_file: fileOrString.optional(),
    mentors_program_avarage: z
      .string()
      .min(1, { message: t("Schemas.required") }),
    program_format: z
      .string()
      .min(1, { message: t("Schemas.required") }),
    contracts: z.array(fileOrString),
    financial_docs: z.array(fileOrString),
  });
};

export type IMentorCoverage = z.infer<
  ReturnType<typeof mentorCostCoverageFormSchema>
>;
