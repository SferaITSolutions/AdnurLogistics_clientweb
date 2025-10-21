import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const onePlusOneProgramSchema = (t: TranslationsType) => {
  const fileOrString = z.union([z.instanceof(File), z.string()]);
  return z.object({
    team: z.array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        role: z.string().min(1, 'Role is required'),
        contribution: z.string().min(1, 'Role is required'),
      })
    ).or(z.string()),
    financial_docs: z.array(fileOrString).min(1, { message: t("Schemas.required") }),

    agreement: z.array(fileOrString).min(1, { message: t("Schemas.required") }),
    short_desctiprion: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    market: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    advantage: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    revenue: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).or(z.number()),
    profit: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).or(z.number()),
    investment_history: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    prediction: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    found_name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    found_short_desctiption: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    found_confirmation_doc: z.array(fileOrString).min(1, { message: t("Schemas.required") }).optional(),

    found_confirmation_link: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).optional(),
    found_other_docs: z.array(fileOrString).min(1, { message: t("Schemas.required") }).optional(),
    total_amount: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).or(z.number()),
    requested_amount: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).or(z.number()),
    deal_structure: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    investment_usage_target: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    investment_usage_plan: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    presentation: z.array(fileOrString).min(1, { message: t("Schemas.required") }),
    financial_report: z.array(fileOrString).min(1, { message: t("Schemas.required") }),
    confirm_correctnes: z.boolean().default(false),
    ready_to_interview: z.boolean().default(false),
    read_terms: z.boolean().default(false),
    isLink: z.string(),
    other_investment_plan: z.string().optional()
  }).refine((data) => {
    if (data.investment_usage_plan === "other") {
      return data.other_investment_plan ? data.other_investment_plan.length > 0 : false;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["other_investment_plan"]
  }).refine((data) => {
    if (data.isLink === "false") {
      return !!data.found_confirmation_doc;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["confirmation_docs"]
  }).refine((data) => {
    if (data.isLink === "true") {
      return data.found_confirmation_link ? data.found_confirmation_link.length > 0 : false;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["found_confirmation_link"]
  });
};

export const onePlusOneProgramUpdateSchema = (t: TranslationsType) => {

  const fileOrString = z.union([z.instanceof(File), z.string()]);
  const coerceToArray = z
    .union([fileOrString, z.array(fileOrString)])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .refine((val) => val.length > 0, { message: t("Schemas.required") });
  return z.object({
    team: z.array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        role: z.string().min(1, 'Role is required'),
        contribution: z.string().min(1, 'Role is required'),
      })
    ).or(z.string()),
    financial_docs: z.preprocess((val) => {
      if (typeof val === 'string') return [val]; // превращаем строку в массив
      return val;
    }, z.array(fileOrString).optional()),

    agreement: coerceToArray,
    short_desctiprion: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    market: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    advantage: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    revenue: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).or(z.number()),
    profit: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).or(z.number()),
    investment_history: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    prediction: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    found_name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    found_short_desctiption: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    found_confirmation_doc: coerceToArray,


    found_confirmation_link: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).optional(),
    found_other_docs: z.preprocess((val) => {
      if (typeof val === 'string') return [val]; // превращаем строку в массив
      return val;
    }, z.array(fileOrString).optional()),

    total_amount: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).or(z.number()),
    requested_amount: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }).or(z.number()),
    deal_structure: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    investment_usage_target: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    investment_usage_plan: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),

    presentation: coerceToArray,

    financial_report: coerceToArray,

    confirm_correctnes: z.boolean().default(false),
    ready_to_interview: z.boolean().default(false),
    read_terms: z.boolean().default(false),
    isLink: z.string(),
    other_investment_plan: z.string().optional()
  }).refine((data) => {
    if (data.investment_usage_plan === "other") {
      return data.other_investment_plan ? data.other_investment_plan.length > 0 : false;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["other_investment_plan"]
  }).refine((data) => {
    if (data.isLink === "false") {
      return !!data.found_confirmation_doc;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["confirmation_docs"]
  }).refine((data) => {
    if (data.isLink === "true") {
      return data.found_confirmation_link ? data.found_confirmation_link.length > 0 : false;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["found_confirmation_link"]
  });
};


export type OnePlusOneProgramSchemaType = z.infer<
  ReturnType<typeof onePlusOneProgramSchema>
>;
export type OnePlusOneProgramUpdateSchemaType = z.infer<
  ReturnType<typeof onePlusOneProgramUpdateSchema>
>;

