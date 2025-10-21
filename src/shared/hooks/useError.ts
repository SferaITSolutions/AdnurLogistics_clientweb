import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { IError400, IError401, IError403 } from "../types";
import { useCallback } from "react";
import { message } from "antd";


export const useError = () => {
  const t = useTranslations("Toast");

  const handleError = useCallback((error: AxiosError) => {
    if (error.status === 400) {
      const data = error.response?.data as IError400;
      const key = Object.keys(data)[0];
      const value = typeof data[key] === "string" ? data[key] : data[key][0];

      message.error(value);
      return;
    }

    if (error.status === 401) {
      const data = error.response?.data as IError401;

      message.error(data.detail);
      return;
    }

    if (error.status === 403) {
      const data = error.response?.data as IError403;

      message.error(data.detail);
      return;
    }
    message.error(t("error"));
  }, [t])


  return handleError
}