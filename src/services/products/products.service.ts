import { axiosWithAuth } from "@/api/interceptors";

class ProductService {
    async getProductsPage(data: { page: number; size: number }) {
        return await axiosWithAuth.post("/product/get/page", data);
    }
    async getProductsList() {
        return await axiosWithAuth.get("/product/get/page");
    }
    async updateProduct(data: {
        nameUz: string;
        nameRu: string;
        nameEn: string;
        nameZh: string;
        nameTr: string;
        descriptionUz: string;
        descriptionRu: string;
        descriptionEn: string;
        descriptionZh: string;
        descriptionTr: string;
        imgUrl: string;
        calculateKg: true;
        id: string;
    }) {
        return await axiosWithAuth.put("/product/update", data);
    }
    async createProduct(data: {
        nameUz: string;
        nameRu: string;
        nameEn: string;
        nameZh: string;
        nameTr: string;
        descriptionUz: string;
        descriptionRu: string;
        descriptionEn: string;
        descriptionZh: string;
        descriptionTr: string;
        imgUrl: string;
        calculateKg: boolean;
    }) {
        return await axiosWithAuth.post("/product/create", data);
    }
    async deleteProduct(id: string) {
        return await axiosWithAuth.delete(`/product/delete?id=${id}`);
    }
    async imageUpload(data: any){
        return await axiosWithAuth.post("/media/attachment/upload", data)
    } 
}
export default new ProductService();
