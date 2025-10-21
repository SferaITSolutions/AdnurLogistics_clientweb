import { AxiosError } from "axios";

/**
 * API dan kelgan AxiosError ichidan foydali xabarni ajratadi.
 * @param error AxiosError yoki boshqa istalgan xato turi
 * @returns xato matni (agar topilmasa "Unexpected error")
 */
export function extractErrorMessage(error: unknown): string {
  if (!error) return "";

  // Agar Axios xato bo‘lsa
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;
    const data = axiosError.response?.data as any;

    // Eng ko‘p ishlatiladigan xabar maydonlari
    const message =
      data?.message ||
      data?.error?.message ||
      data?.detail ||
      data?.error_description ||
      axiosError.message;

    return message || "Unexpected error occurred";
  }

  // Agar oddiy xato bo‘lsa
  if (error instanceof Error) {
    return error.message || "Unexpected error";
  }

  // Agar boshqa turdagi narsa bo‘lsa
  return String(error);
}
