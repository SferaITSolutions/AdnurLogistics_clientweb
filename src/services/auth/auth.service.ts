import { axiosInstace, axiosWithAuth } from '@/api/interceptors';
import { removeLocalItem, setLocalItem } from '@/shared/utils/storage';

import { LoginSchemaType } from '@/shared/schemas/loginSchema';
import { RegisterSchemaType } from '@/shared/schemas/registerSchema';
import { IForeignRegisterData } from '@/shared/types/auth';

export const authService = {
  async clearStorage() {
    removeLocalItem('access_token');
    removeLocalItem('refresh_token');
    removeLocalItem('identity');
    if (typeof window !== 'undefined') window.location.href = '/';
  },

  async login(data: LoginSchemaType) {
    const response = await axiosInstace.post('/auth/login', data);
    return response;
  },

  async refresh(token: string) {
    try {
      const response = await axiosInstace.post('/auth/refresh/token', { token });

      setLocalItem('access_token', response.data.token);
      setLocalItem('refresh_token', token);

      return response.data.token;
    } catch (error) {
      removeLocalItem('access_token');
      removeLocalItem('refresh_token');
      removeLocalItem('identity');
      if (typeof window !== 'undefined') window.location.href = '/';
      throw error;
    }
  },

  async logout() {
    const response = await axiosInstace.post('/token/delete/');

    return response;
  },

  async verifyCode(data: { identity: string; code: string }) {
    const res = await axiosWithAuth.post('/auth/verify/code', data);

    return res;
  },

  async foreignRegister(data: IForeignRegisterData) {
    const response = await axiosWithAuth.post('/auth/register', data);

    return response;
  },

  async register(data: RegisterSchemaType) {
    const response = await axiosWithAuth.post('/auth/register', data);

    return response;
  },

  async verifyEmail(email: string, code: string) {
    const res = await axiosWithAuth.post('/verify/', { code, email });

    return res;
  },

  async requestResetPassword(email: string) {
    const res = await axiosWithAuth.post('/reset-password/send-link/', {
      email,
    });

    return res;
  },

  async resetPassword(token: string, password: string) {
    const res = await axiosWithAuth.post('/reset-password/', {
      token,
      password,
    });

    return res;
  },

  async sendVerificationCode(email: string) {
    const res = await axiosWithAuth.post('/verify/send-code/', { email });
    return res;
  },
};
