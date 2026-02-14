import { axiosWithAuth } from "@/api/interceptors";

class DirectionService {
    async getDirection(productId: string) {
        return await axiosWithAuth.get(`/direction/get?productId=${productId}`);
    }
    async createDirection(data: {
        productId: string;
        fromLocationId: string;
        toLocationId: string;
    }) {
        return await axiosWithAuth.post(`/direction/create`, data);
    }
    async updateDirection(data: {
        productId: string;
        fromLocationId: string;
        toLocationId: string;
        id: string
    }) {
        return await axiosWithAuth.put(`/direction/update`, data);
    }
    async deleteDirection(id: string) {
        return await axiosWithAuth.post(`/direction/delete?id=${id}`);
    }
    //   async imageUpload(data: any) {
    //     return await axiosWithAuth.post("/media/attachment/upload", data);
    //   }
}
export default new DirectionService();
