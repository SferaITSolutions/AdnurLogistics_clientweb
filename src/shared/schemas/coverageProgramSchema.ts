import { z } from "zod";
import { TranslationsType } from "../types/locales";

export const coverageProgramSchema = (t: TranslationsType) => {
  return z.object({
    participants: z.array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        role: z.string().min(1, 'Role is required'),
      })
    ),
    certificates: z.instanceof(File, { message: t("Schemas.required") }).array(),
    financial_docs: z.instanceof(File, { message: t("Schemas.required") }).array(),
    program_raiting: z.instanceof(File, { message: t("Schemas.required") }),
    program_type: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    organization: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    address: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_format: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    duration: z.number({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    purpose: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_cost: z.number({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    transport_cost: z.number({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    accommodation: z.number({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    accommodation_days: z.number({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    total: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    long_description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    confirm_correctnes: z.boolean().default(false),
    ready_to_interview: z.boolean().default(false),
    read_terms: z.boolean().default(false)
  });
};

export const updateCoverageProgramSchema = (t: TranslationsType) => {

  const fileOrString = z.union([z.instanceof(File), z.string()]);
  const coerceToArray = z
    .union([fileOrString, z.array(fileOrString)])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .refine((val) => val.length > 0, { message: t("Schemas.required") });
  return z.object({
    participants: z.array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        role: z.string().min(1, 'Role is required'),
      })
    ),
    certificates: z.union([z.array(z.any()), z.instanceof(File), z.null()]).optional(),
    financial_docs: z.union([z.array(z.any()), z.instanceof(File), z.null()]).optional(),
    program_raiting: coerceToArray,

    program_type: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_name: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    organization: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    address: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_format: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    duration: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    purpose: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_cost: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    transport_cost: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    accommodation: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    accommodation_days: z.coerce.number({ required_error: t("Schemas.required") }).nonnegative(),
    total: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    program_description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    long_description: z.string({ required_error: t("Schemas.required") }).min(1, { message: t("Schemas.required") }),
    confirm_correctnes: z.boolean().default(false),
    ready_to_interview: z.boolean().default(false),
    read_terms: z.boolean().default(false)
  });
};

export type CoverageProgramSchemaType = z.infer<
  ReturnType<typeof coverageProgramSchema>
>;
