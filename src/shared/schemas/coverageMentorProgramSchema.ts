import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const coverageMentorProgramSchema = (t: TranslationsType) => {
  return z.object({
    name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_type: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    purpose: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    duration: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    startups: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    startups_finished: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_format: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    mentors: z.array(
      z.object({
        name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
        origin: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
        confirmation: z.instanceof(File, { message: t("Schemas.required") }),
        agreement: z.instanceof(File, { message: t("Schemas.required") }),
      })
    ).nonempty({ message: t("Schemas.required") }),
    mentors_payment: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    transport_expenses: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    rental_expenses: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    equipment_expenses: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    other_expenses: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    final_report: z.instanceof(File, { message: t("Schemas.required") }),
    program_description: z.instanceof(File, { message: t("Schemas.required") }),
    financial_docs: z.instanceof(File, { message: t("Schemas.required") }).array(),
    explanation: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    total: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).optional(),
    confirm_correctnes: z.boolean().default(false),
    ready_to_interview: z.boolean().default(false),
    read_terms: z.boolean().default(false),
  });
};

export type CoverageMentorProgramSchemaType = z.infer<
  ReturnType<typeof coverageMentorProgramSchema>
>;
