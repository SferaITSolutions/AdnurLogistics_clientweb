import { useMutation } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { message } from "antd";
import { loginSchema } from "@/shared/schemas/loginSchema";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useError } from "@/shared/hooks/useError";

export const useLoginMutation = () => {
    const t = useTranslations();
    const formSchema = loginSchema(t);
    const handleError = useError()
    return useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => authService.login(data), // asosiy API call
        onSuccess: (data) => {
            message.success("Tizimga muvaffaqiyatli kirdingiz ✅");
        },
        onError: (error: any) => {
            handleError(error)
        },
    });
};
