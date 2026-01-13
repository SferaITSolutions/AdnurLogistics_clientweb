import { axiosWithAuth } from "@/api/interceptors";

class PriceService {
  async getToPriceService(data: {
    page: number;
    size: number;
  }) {
    return await axiosWithAuth.post("/delivery-price/get/page", data);
  }
  async createPriceService(data: {
    minWeight: number;
    maxWeight: number;
    cub3: number;
    price: number;
    cubMultiplier: number;
    priceMultiplier: number;
    fromLocation: string;
    toLocation: string;
  }) {
    return await axiosWithAuth.post("/delivery-price/create", data);
  }
  async updatePriceService(data: {
    minWeight: number;
    maxWeight: number;
    cub3: number;
    price: number;
    cubMultiplier: number;
    priceMultiplier: number;
    fromLocation: string;
    toLocation: string;
    id: string;
  }) {
    return await axiosWithAuth.put("/delivery-price/update", data);
  }
  async deletePriceService(id: string) {
    return await axiosWithAuth.delete(`/delivery-price/delete?id=${id}`);
  }
  async toLocationsList() {
    return await axiosWithAuth.get(`/location/get/to/list`);
  }
  async fromLocationsList() {
    return await axiosWithAuth.get(`/location/get/from/list`);
  }
}
export default new PriceService();
