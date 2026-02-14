import { axiosWithAuth } from "@/api/interceptors";

class UsersService {
    async getUsers(data: {
        page: number;
        size: number;
        phone: string;
        client: number;
        entityId: string;
    }) {
        const response = await axiosWithAuth.post('/user/get/page', data);
        return response.data;
    }
    async getEntityIds() {
        const response = await axiosWithAuth.get(`/user/get/entity-id/list`);
        return response.data;
    }
    async getExcel() {
        const response = await axiosWithAuth.get(`/user/get/excel`, {
            responseType: 'blob', 
        });
        return response.data;
    }
    async updateusetsEntity(userId: string) {
        const response = await axiosWithAuth.put(`/user/update/entity-id?userId=${userId}`);
        return response.data;
    }
}

export default new UsersService();