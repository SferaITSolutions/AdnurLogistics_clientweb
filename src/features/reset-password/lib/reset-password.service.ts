import { axiosWithAuth } from "@/api/interceptors";

class ResetPasswordService {
  static async resetPassword(data: {
    oldPassword: string;
    newPassword: string;
    prePassword: string;
  }) {
    const response = await axiosWithAuth.put(`/auth/update/password`, data);
    return response.data;
  }
}

export default ResetPasswordService;