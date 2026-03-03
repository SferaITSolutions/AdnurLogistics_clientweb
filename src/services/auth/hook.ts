"use client"
import { getLocalItem, setLocalItem } from '@/shared/utils/storage';
import { authService } from './auth.service';
import { loginSchema } from '@/shared/schemas/loginSchema';
import { registerSchema } from '@/shared/schemas/registerSchema';
import { useError } from '@/shared/hooks/useError';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';
import { extractErrorMessage } from '@/shared/utils';

// Lang prefiksi bilan path yasovchi helper
const getLocalizedPath = (lang: string, path: string) => `/${lang}${path}`;

// URL dan lang olish uchun helper
const getLangFromPathname = (pathname: string) => {
  return pathname.split("/").filter(Boolean)[0] || "uz";
};

// Role ga qarab redirect path
const getRoleBasedPath = (roleName: string, lang: string) => {
  if (roleName === "ROLE_SUPER_ADMIN") return getLocalizedPath(lang, "/client/admin/users");
  if (roleName === "ROLE_USER") return getLocalizedPath(lang, "/client/dashboard");
  return getLocalizedPath(lang, "/client/sales-manager");
};

export const useLoginMutation = () => {
  const router = useRouter();
  const pathname = usePathname();
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

      const lang = getLangFromPathname(pathname);
      toast.success(t("authSuccessMessages.loginSuccess"));
      router.push(getRoleBasedPath(roleName, lang));
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
      // toast.success('Phone is available');
    },
    onError: (error: any) => {
      toast.error(extractErrorMessage(error?.response?.data?.message));
    },
  });
};

export const useSendCodeMutation = (onSuccess?: () => void, onError?: (error: any) => void) => {
  return useMutation({
    mutationFn: (phone: any) => authService.sendCode(phone),
    onSuccess: () => {
      // toast.success('Code sent successfully');
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(extractErrorMessage(error?.response?.data?.message));
      onError?.(error);
    },
  });
};
export const useRegisterMutation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const formSchema = registerSchema(t);
  const handleError = useError();

  return useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => authService.register(data),
    onSuccess: (data) => {
      const { identity, accessToken, roleName, refreshToken } = data.data;
      setLocalItem('identity', identity);
      setLocalItem('access_token', accessToken);
      setLocalItem('roleName', roleName);
      setLocalItem('refresh_token', refreshToken);
      toast.success(t('authSuccessMessages.loginSuccess'));

      const lang = getLangFromPathname(pathname);
      router.push(getRoleBasedPath(roleName, lang));
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
};

export const useResentPasswordMutation = (onSuccess?: () => void, onError?: (error: any) => void) => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: { identity: string; password: string; resentPassword: string }) => authService.resentPassword(data),
    onSuccess: () => {
      toast.success('');
      router.push("/auth/log-in");
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
      onError?.(error);
    },
  });
};

export const useCheckIdentityMutation = (onSuccess?: () => void, onError?: (error: any) => void) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleError = useError();
  const t = useTranslations();

  return useMutation({
    mutationFn: (data: { code: any; identity: string }) =>
      authService.verifyCode({ code: data.code, identity: data.identity || '' }),
    onSuccess: (data) => {
      const { accessToken, roleName, refreshToken } = data.data;
      setLocalItem('access_token', accessToken);
      setLocalItem('roleName', roleName);
      setLocalItem('refresh_token', refreshToken);
      toast.success("");

      const lang = getLangFromPathname(pathname);
      router.push(getRoleBasedPath(roleName, lang));
      onSuccess?.();
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
};
export const useCheckIdentityMutationForForgotPassword = ({ onSuccess, onError }: { onSuccess?: (response: any) => void, onError?: (error: any) => void }) => {

  return useMutation({
    mutationFn: (data: { code: any; identity: string }) =>
      authService.verifyCode({ code: data.code, identity: data.identity || '' }),
    onSuccess: (response: any) => {
      onSuccess?.(response);
    },
    onError: (error: any) => {
      toast.error(extractErrorMessage(error?.response?.data?.message));
      // onError?.(error);
    },
  });
};