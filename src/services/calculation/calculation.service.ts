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
    fromLocation: string;
    toLocation: string;
    weight: number;
    bulk: number;
    density: number;
    containerType: string;
    customs: boolean;
    price: number;
  }) {
    const response = await axiosWithAuth.post(`/petition/create`, data);
    return response.data;
  }
}

export default CalculationService;
