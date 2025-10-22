import { useMutation } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { message } from "antd";
import { loginSchema } from "@/shared/schemas/loginSchema";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useError } from "@/shared/hooks/useError";
import { registerSchema } from "@/shared/schemas/registerSchema";

export const useLoginMutation = () => {
    const t = useTranslations();
    const formSchema = loginSchema(t);
    const handleError = useError()
    return useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => authService.login(data), // asosiy API call
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.data.accessToken)
            message.success("Tizimga muvaffaqiyatli kirdingiz ✅");
        },
        onError: (error: any) => {
            handleError(error)
        },
    });
};

export const useRegisterMutation = () => {
    const t = useTranslations();
    const formSchema = registerSchema(t);
    const handleError = useError()
    return useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => authService.register(data), // asosiy API call
        onSuccess: (data) => {
            localStorage.setItem('identity', data.data.identity)
            message.success("Tizimga muvaffaqiyatli kirdingiz ✅");
        },
        onError: (error: any) => {
            handleError(error)
        },
    });
};

export const useCheckIdentityMutation = () => {
    const handleError = useError()
    const identity = localStorage.getItem('identity')
    return useMutation({
        mutationFn: (code: string) => authService.verifyCode({ code, identity: identity || '' }), // asosiy API call
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.data.accessToken)
            message.success("Tizimga muvaffaqiyatli kirdingiz ✅");
        },
        onError: (error: any) => {
            handleError(error)
        },
    });
};
