import { axiosWithAuth } from "@/api/interceptors";

class NotificationService {
  async getNotefication() {
    return await axiosWithAuth.get("/notification/auto-message/get/list");
  }
  async getNoteficationOne() {
    return await axiosWithAuth.get("/notification/auto-message/get/one");
  }
  async createNotefication(data: { message: string; status: string }) {
    return await axiosWithAuth.post("/notification/auto-message/create", data);
  }
  async updateNoteficationStatus(data: {
    status: string;
    active: string;
  }) {
    return await axiosWithAuth.put(`/notification/auto-message/update/active`, data);
  }
}
export default new NotificationService();
