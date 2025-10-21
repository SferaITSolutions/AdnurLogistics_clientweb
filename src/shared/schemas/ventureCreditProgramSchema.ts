import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const ventureCreditProgramSchema = (t: TranslationsType) => {
  return z.object({
    revenue: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    profit: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    credit_history: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    credit_history_doc: z.instanceof(File, { message: t("Schemas.required") }),
    short_desciption: z.string().min(1, { message: t("Schemas.required") }),
    credit_purpose: z.string().min(1, { message: t("Schemas.required") }),
    credit_amount: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    credit_usage_plan: z.string().min(1, { message: t("Schemas.required") }),
    financial_report: z.instanceof(File, { message: t("Schemas.required") }),
    balance_sheet: z.instanceof(File, { message: t("Schemas.required") }),
    profit_report: z.instanceof(File, { message: t("Schemas.required") }),
    cash_flow_report: z.instanceof(File, { message: t("Schemas.required") }),
    business_plan_report: z.instanceof(File, { message: t("Schemas.required") }),
    credit_purpose_report: z.instanceof(File, { message: t("Schemas.required") }),
    market_analysis_report: z.instanceof(File, { message: t("Schemas.required") }),
    profitability_prediction_report: z.instanceof(File, { message: t("Schemas.required") }),
    potential_risks_report: z.instanceof(File, { message: t("Schemas.required") }),
    legal_registration_certificate: z.instanceof(File, { message: t("Schemas.required") }),
    founding_document: z.instanceof(File, { message: t("Schemas.required") }),
    credit_confirmation_document: z.instanceof(File, { message: t("Schemas.required") }),
    repay_period: z.string().min(1, { message: t("Schemas.required") }),
    repay_schedule: z.string().min(1, { message: t("Schemas.required") }),
    tax_reports: z.instanceof(File, { message: t("Schemas.required") }).array(),
    explanation: z.string().min(1, { message: t("Schemas.required") }).optional(),
    otherGoal: z.string().min(1, { message: t("Schemas.required") }).optional(),
    otherSchedule: z.string().min(1, { message: t("Schemas.required") }).optional(),
    confirm_correctnes: z.boolean().default(false),
    ready_to_interview: z.boolean().default(false),
    read_terms: z.boolean().default(false),
  });
};

export const updateVentureCreditProgramSchema = (t: TranslationsType) => {
  const fileOrString = z.union([z.instanceof(File), z.string()]);
  const coerceToArray = z
    .union([fileOrString, z.array(fileOrString)])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .refine((val) => val.length > 0, { message: t("Schemas.required") });

  return z
    .object({
      revenue: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
      profit: z
        .union([z.string(), z.number()])
        .transform((val) => String(val))
        .refine((val) => val.length > 0, { message: t("Schemas.required") }),
      credit_history: z.string({ required_error: t("Schemas.required") }).min(1, {
        message: t("Schemas.required"),
      }),
      credit_history_doc: coerceToArray,
      short_desciption: z.string().min(1, { message: t("Schemas.required") }),
      credit_purpose: z.string().min(1, { message: t("Schemas.required") }),
      credit_amount: z
        .union([z.string(), z.number()])
        .transform((val) => String(val))
        .refine((val) => val.length > 0, { message: t("Schemas.required") }),
      credit_usage_plan: z.string().min(1, { message: t("Schemas.required") }),
      financial_report: coerceToArray,
      balance_sheet: coerceToArray,
      profit_report: coerceToArray,
      cash_flow_report: coerceToArray,
      business_plan_report: coerceToArray,
      credit_purpose_report: coerceToArray,
      market_analysis_report: coerceToArray,
      profitability_prediction_report: coerceToArray,
      potential_risks_report: coerceToArray,
      legal_registration_certificate: coerceToArray,
      founding_document: coerceToArray,
      credit_confirmation_document: coerceToArray,
      repay_period: z
        .union([z.string(), z.number()])
        .transform((val) => String(val))
        .refine((val) => val.length > 0, { message: t("Schemas.required") }),
      repay_schedule: z.string().min(1, { message: t("Schemas.required") }),
      tax_reports: z
        .array(fileOrString)
        .min(1, { message: t("Schemas.required") })
        .or(z.literal('')),
      explanation: z.string().min(1, { message: t("Schemas.required") }).optional(),
      otherGoal: z.string().min(1, { message: t("Schemas.required") }).optional(),
      otherSchedule: z.string().min(1, { message: t("Schemas.required") }).optional(),
      confirm_correctnes: z.boolean().default(false),
      ready_to_interview: z.boolean().default(false),
      read_terms: z.boolean().default(false),
    })
    .passthrough(); // Allow extra fields like admin_status, id, etc.
};

export type VentureCreditProgramSchemaType = z.infer<
  ReturnType<typeof ventureCreditProgramSchema>
>;

export type UpdateVentureCreditProgramSchemaType = z.infer<
  ReturnType<typeof updateVentureCreditProgramSchema>
>;
