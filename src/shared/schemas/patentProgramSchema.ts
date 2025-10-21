import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const patentProgramSchema = (t: TranslationsType) => {
  return z.object({
    confirmation_docs: z.instanceof(File, { message: t("Schemas.required") }).array(),
    financial_docs: z.instanceof(File, { message: t("Schemas.required") }).array(),
    contracts: z.instanceof(File, { message: t("Schemas.required") }).array(),
    obj_name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    obj_type: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    obj_short_description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    obj_usage_area: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    date_applied: z.string({ required_error: t("Schemas.required") }),
    date_registered: z.string({ required_error: t("Schemas.required") }).optional(),
    registration_number: z.string().min(1, { message: t("Schemas.required") }).optional(),
    legal_fee: z.string({ required_error: t("Schemas.required") }).min(0, { message: t("Schemas.required") }),
    attorney_service_fee: z.string({ required_error: t("Schemas.required") }).min(0, { message: t("Schemas.required") }),
    international_transfer_fee: z.string().min(0, { message: t("Schemas.required") }).optional(),
    legal_expertice_cost: z.string({ required_error: t("Schemas.required") }).min(0, { message: t("Schemas.required") }),
    other_costs: z.string({ required_error: t("Schemas.required") }).min(0, { message: t("Schemas.required") }),
    total_costs: z.string({ required_error: t("Schemas.required") }).min(0, { message: t("Schemas.required") }),
    obj_long_description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    other_docs: z.instanceof(File).array().optional(),
    confirm_correctnes: z.boolean().default(false),
    ready_to_interview: z.boolean().default(false),
    other_obj_type: z.string().optional()
  }).refine((data) => {
    if (data.obj_type === "other") {
      return data.other_obj_type ? data.other_obj_type.length > 0 : false;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["other_obj_type"]
  });
}

export const updatePatentProgramSchema = (t: TranslationsType) => {
  const fileOrString = z.union([z.instanceof(File), z.string()]);
  return z.object({
    confirmation_docs: z.array(fileOrString).min(1, { message: t("Schemas.required") }),
    financial_docs: z.array(fileOrString).min(1, { message: t("Schemas.required") }),
    contracts: z.array(fileOrString).min(1, { message: t("Schemas.required") }),
    obj_name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    obj_type: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    obj_short_description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    obj_usage_area: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    date_applied: z.string({ required_error: t("Schemas.required") }),
    date_registered: z.string({ required_error: t("Schemas.required") }).optional(),
    registration_number: z.string().min(1, { message: t("Schemas.required") }).optional(),
    legal_fee: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    attorney_service_fee: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    international_transfer_fee: z.coerce.number().nonnegative().optional(),
    legal_expertice_cost: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    other_costs: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    total_costs: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),

    obj_long_description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    other_docs: z.array(fileOrString).optional(),
    confirm_correctnes: z.boolean().default(false),
    ready_to_interview: z.boolean().default(false),
    other_obj_type: z.string().optional()
  }).refine((data) => {
    if (data.obj_type === "other") {
      return data.other_obj_type ? data.other_obj_type.length > 0 : false;
    }
    return true;
  }, {
    message: t("Schemas.minString", { min: 2 }),
    path: ["other_obj_type"]
  });
}

export type PatentProgramSchemaType = z.infer<
  ReturnType<typeof patentProgramSchema>
>;

export type UpdatePatentProgramSchemaType = z.infer<
  ReturnType<typeof updatePatentProgramSchema>
>;
