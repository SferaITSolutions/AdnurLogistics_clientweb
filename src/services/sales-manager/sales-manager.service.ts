import { axiosWithAuth } from "@/api/interceptors";

class SalesManagerService {
  async getGetSalesOrders(data: {
    page: number;
    userNumber: string;
    search: number;
  }) {
    return await axiosWithAuth.post("/order/get/page/by-number", data);
  }
}
export default new SalesManagerService();
