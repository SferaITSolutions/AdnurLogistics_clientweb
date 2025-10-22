import { axiosWithAuth } from '@/api/interceptors';

export const meService = {
  async me() {
    return axiosWithAuth.get<{
      code: string;
      fullname: string;
      id: string;
      phone: string;
    }>('/auth/get/me');
  },

  async updateMe(name: string) {
    return axiosWithAuth.put(`/auth/update?fullname=${name}`);
  },
};
