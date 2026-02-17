import { axiosWithAuth } from "@/api/interceptors";

class CalculationService {
  static async calculate(data: {
    fromLocation: string;
    customs: boolean;
    weight: number;
    cub: number;
  }) {
    const response = await axiosWithAuth.post(`/petition/colculate`, data);
    return response.data;
  }
  static async createPetition(data: {
    directionId: string;
    weight: number;
    bulk: number;
    containerType: string;
    customs: boolean;
    price: number;
  }) {
    const response = await axiosWithAuth.post(`/petition/create`, data);
    return response.data;
 
  }
  static async getProductsList() {
    const response = await axiosWithAuth.get(`/product/get/list`);
    return response.data;
  }
  static async getDirectionList(ProductId: string) {
    const response = await axiosWithAuth.get(`/direction/get/list?productId=${ProductId}`);
    return response.data;
  }
  static async applyForm(data: {
    fromLocation: string;
    toLocation: string;
    weight: number;
    bulk: number;
    customs: boolean;
  }) {
    const response = await axiosWithAuth.post(`/petition/create/fcl`, data);
    return response.data;
  }
}

export default CalculationService;
