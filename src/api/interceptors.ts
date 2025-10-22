import { authService } from "@/services/auth/auth.service";
import axios, { type CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
};


const axiosWithAuth = axios.create(options);

const axiosInstace = axios.create(options);

axiosWithAuth.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const locale = localStorage.getItem("locale") || "en";
      config.headers["Accept-Language"] = locale;
    }
    const token = window.localStorage.getItem('access_token')
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        error?.response?.data?.code?.toLowerCase() === "token_not_valid" ||
        error?.response?.data?.detail === "Token is invalid or expired") &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      window.localStorage.removeItem('access_token')
      window.location.href = '/'
    }
  }
);

export { axiosWithAuth, axiosInstace };
