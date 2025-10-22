import { axiosInstace } from "@/api/interceptors";
import { ApplyRequest } from "@/shared/types/lenging-page-types";

export class ApplyService {
  async sendApplyRequest(data: ApplyRequest) {
    const response = await axiosInstace.post("api/v1/petition/create", data);
    return response.data;
  }
}