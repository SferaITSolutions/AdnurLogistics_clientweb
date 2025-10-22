import { axiosInstace, axiosWithAuth } from "@/api/interceptors";

class DashboardService {
  async getOrdersData(data: any) {
    return await axiosWithAuth.post('/order/get/page', data);
  }
  async getOrderById(id: string) {
    return await axiosWithAuth.get(`/order/one?orderId=${id}`);
  }
}
export default new DashboardService();