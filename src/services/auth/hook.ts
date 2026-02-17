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
      // localStorage.clear()
      setLocalItem("roleName", roleName);
      setLocalItem("access_token", accessToken);
      setLocalItem("refresh_token", refreshToken);

      if (roleName === "ROLE_SUPER_ADMIN") {
        toast.success(t("authSuccessMessages.loginSuccess"));
        router.push("/client/admin/users");
      } else if (roleName === "ROLE_USER") {
        toast.success(t("authSuccessMessages.loginSuccess"));
        router.push("/client/dashboard");
      } else {
        router.push("/client/sales-manager");
      }
    },

    onError: (error: any) => {
      handleError(error);
    },
  });
};

export const useCheckPhoneMutation = () => {
  return useMutation({
    mutationFn: (phone: any) => authService.checkphone(phone),
    onSuccess: () => {
      toast.success('Phone is available');
    },
    onError: () => {
      toast.error('Phone is not available');
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
      setLocalItem('access_token', data.data.accessToken);
      setLocalItem('roleName', data.data.roleName);
      setLocalItem('refresh_token', data.data.refreshToken);
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
    mutationFn: (data: { code: any, identity: string }) => authService.verifyCode({ code: data.code, identity: data.identity || '' }), // asosiy API call
    onSuccess: (data) => {
      setLocalItem('access_token', data.data.accessToken);
      setLocalItem('roleName', data.data.roleName);
      setLocalItem('refresh_token', data.data.refreshToken);
      toast.success(t('authSuccessMessages.loginSuccess'));
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
};
