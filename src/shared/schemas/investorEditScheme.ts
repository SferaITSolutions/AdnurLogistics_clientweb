import { z } from "zod";
import { TranslationsType } from "../types/locales";
import { InvestorTypeEnum } from "./indexSchema";

export const InvestorEditSchema = (t: TranslationsType) => {
    return z.object({
        industries: z
            .array(z.string())
            .min(1, { message: t("Schemas.industries.min") })
            .nonempty({ message: t("Schemas.industries.nonempty") }),
        name: z.string().min(2, { message: t("Schemas.name.min") }),
        investor_type: InvestorTypeEnum(t),
        email: z.string().email({ message: t("Schemas.email") }),
        description: z.string().min(10, { message: t("Schemas.description.min") }),
        photo: z
            .instanceof(File)
            .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type), {
                message: t("Schemas.logo.invalid_type"),
            })
            .refine((file) => file.size <= 5 * 1024 * 1024, {
                message: t("Schemas.logo.max_size"),
            }).or(z.string()).optional().nullable(),
        link: z.string().url({ message: t("Schemas.link.invalid") }),
        stages: z
            .array(z.string())
            .min(1, { message: t("Schemas.stages.min") })
            .nonempty({ message: t("Schemas.stages.nonempty") }),
        contacts: z.string().min(5, { message: t("Schemas.contacts.min") }),
        investment_amount: z.string().min(1, { message: t("Schemas.investment_amount.min") }),
        country: z.string({ required_error: t("Schemas.required") }).optional(),
        region: z.string({ required_error: t("Schemas.required") }),
    });
};

export type InvestorEditSchemaType = z.infer<
    ReturnType<typeof InvestorEditSchema>
>;
