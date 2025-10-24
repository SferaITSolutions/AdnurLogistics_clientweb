'use client'
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { IError400, IError401, IError403, IError404 } from "../types";
import { useCallback } from "react";
import { toast } from "sonner";


export const useError = () => {
  const t = useTranslations("Toast");
  const handleError = useCallback((error: AxiosError) => {
    if (error.status === 400) {
      const data = error.response?.data as IError400;
      const value = data.message;

      toast.error(value || 'error');
      return;
    }

    if (error.status === 404) {
      const data = error.response?.data as IError404;
      const value = data.message;
      toast.error(value || 'error');
      return;
    }

    if (error.status === 401) {
      const data = error.response?.data as IError401;
      toast.error(data.detail);
      return;
    }

    if (error.status === 403) {
      const data = error.response?.data as IError403;

      toast.error(data.detail);
      return;
    }

    toast.error(error.response?.data as string || 'Something went wrong');
  }, [t])


  return handleError
}