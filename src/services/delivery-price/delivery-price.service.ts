import { axiosWithAuth } from "@/api/interceptors";
interface pricelist {
    minWeight: number;
    maxWeight: number;
    cub3: number;
    overPrice: boolean;
    directionId: string;
}
interface priceData {
    pricelist: pricelist[];
}
class DeliveryPriceService {
    async createDeliveryPrice(data: priceData) {
        return await axiosWithAuth.post("/delivery-price/create", data);
    }
    async getDeliveryPrice(data: {
        page: number;
        size: number;
        productId: string;
    }) {
        return await axiosWithAuth.post("/delivery-price/get/page", data);
    }
    async updateDeliveryPrice(data: {
        minWeight: number;
        maxWeight: number;
        cub3: number;
        overPrice: boolean;
        directionId: string;
        id: string;
    }) {
        return await axiosWithAuth.put("/delivery-price/update", data);
    }
    async deleteDeliveryPrice(id: string) {
        axiosWithAuth.delete(`/delivery-price/delete?id=${id}`);
    }
}
export default new DeliveryPriceService();
