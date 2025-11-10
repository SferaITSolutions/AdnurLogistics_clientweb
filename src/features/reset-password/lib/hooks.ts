import { useMutation } from "@tanstack/react-query";
import ResetPasswordService from "./reset-password.service";
import { toast } from "sonner";
import { useTranslations } from "next-intl";


export const useResetPassword = () => {
 return useMutation({
    mutationFn: (data: {
        oldPassword: string;
        newPassword: string;
        prePassword: string;
    }) => ResetPasswordService.resetPassword(data),
    onSuccess: () => {
        toast.success("Password updated successfully");
    },
    onError: (error: any) => {
        toast.error(error?.response?.data?.message || "An error occurred");
    },
 });
}