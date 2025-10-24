import { axiosInstace, axiosWithAuth } from '@/api/interceptors';

import { IForeignRegisterData } from '@/shared/types/auth';
import { LoginSchemaType } from '@/shared/schemas/loginSchema';

export const authService = {
  async login(data: LoginSchemaType) {
    const response = await axiosInstace.post('/token/', data);

    return response;
  },

  async refresh() {
    const response = await axiosInstace.post('/auth/login');
    return response;
  },

  async logout() {
    const response = await axiosInstace.post('/token/delete/');

    return response;
  },

  async foreignRegister(data: IForeignRegisterData) {
    const response = await axiosWithAuth.post('/register/', data);

    return response;
  },

  async verifyEmail(email: string, code: string) {
    const res = await axiosWithAuth.post('/verify/', { code, email });

    return res;
  },

  async requestResetPassword(email: string) {
    const res = await axiosWithAuth.post('/reset-password/send-link/', { email });

    return res;
  },

  async resetPassword(token: string, password: string) {
    const res = await axiosWithAuth.post('/reset-password/', { token, password });

    return res;
  },

  async sendVerificationCode(email: string) {
    const res = await axiosWithAuth.post('/verify/send-code/', { email });

    return res;
  },
};
