"use client"
import { getLocalItem, setLocalItem } from '@/shared/utils/storage';
import { authService } from './auth.service';
import { loginSchema } from '@/shared/schemas/loginSchema';
import { message } from 'antd';
import { registerSchema } from '@/shared/schemas/registerSchema';
import { useError } from '@/shared/hooks/useError';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useLoginMutation = () => {
  const router = useRouter();
  const t = useTranslations();
  const formSchema = loginSchema(t);
  const handleError = useError();

  return useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => authService.login(data),

    onSuccess: async (response) => {
      const { roleName, accessToken, refreshToken } = response.data;

      setLocalItem("roleName", roleName);
      setLocalItem("access_token", accessToken);
      setLocalItem("refresh_token", refreshToken);

      if (roleName === "ROLE_SUPER_ADMIN") {
        toast.success(t("authSuccessMessages.loginSuccess"));
        router.push("/client/admin/prices"); 
      } else {
        toast.success(t("authSuccessMessages.loginSuccess"));
        router.push("/client/dashboard");
      }
    },

    onError: (error: any) => {
      handleError(error);
    },
  });
};

export const useRegisterMutation = () => {
  const t = useTranslations();
  const formSchema = registerSchema(t);
  const handleError = useError();
  return useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => authService.register(data), // asosiy API call
    onSuccess: (data) => {
      setLocalItem('identity', data.data.identity);
      toast.success(t('authSuccessMessages.loginSuccess'));
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
};

export const useCheckIdentityMutation = () => {
  const handleError = useError();
  const identity = getLocalItem('identity');
  const t = useTranslations();
  return useMutation({
    mutationFn: (code: string) => authService.verifyCode({ code, identity: identity || '' }), // asosiy API call
    onSuccess: (data) => {
      setLocalItem('access_token', data.data.accessToken);
      setLocalItem('refresh_token', data.data.refreshToken);
      toast.success(t('authSuccessMessages.loginSuccess'));
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
};
