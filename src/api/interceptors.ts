import { authService } from '@/services/auth/auth.service';
import { getLocalItem } from '@/shared/utils/storage';
import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
};

const axiosWithAuth = axios.create(options);

const axiosInstace = axios.create(options);

axiosWithAuth.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const locale = getLocalItem('locale') || 'en';
      const lang = getLocalItem('lang')?.toString()?.toLocaleUpperCase();
      config.headers['Accept-Language'] = locale;
      config.headers['X-Lang'] = lang;
    }
    const token = getLocalItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar token eskirgan bo‘lsa
    if (error?.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getLocalItem('refresh_token');
        const newToken = await authService.refresh(refreshToken || '');

        // ✅ Headerni yangilaymiz
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // ✅ Eski requestni qayta yuboramiz
        return axiosWithAuth(originalRequest);
      } catch (refreshError) {
        authService.clearStorage();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { axiosInstace, axiosWithAuth };
