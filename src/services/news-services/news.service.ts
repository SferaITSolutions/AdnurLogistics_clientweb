import { axiosWithAuth } from "@/api/interceptors";

class NewsService {
  async getNewsList(data: { page: number; size: number }) {
    return await axiosWithAuth.post("/news/get/page", data);
  }
  async deleteNews(id: number) {
    return await axiosWithAuth.delete(`/news/delete?id=${id}`);
  }
  async createNews(data: {
    title: string;
    content: string;
    imgUrl: string;
    status: string | "PUBLIC" | "DRAFT";
  }) {
    return await axiosWithAuth.post("/news/create", data);
  }
  async updateNews(data: {
    title: string;
    content: string;
    imgUrl: string;
    status: string | "PUBLIC" | "DRAFT";
    id: string;
  }) {
    return await axiosWithAuth.put("/news/update", data);
  }
  async updateNewsStatus(data: {
    id: string;
    status: string | "PUBLIC" | "DRAFT";
  }) {
    return await axiosWithAuth.put("/news/update/status",data);
  }
}
export default new NewsService();
