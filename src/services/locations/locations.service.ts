import { axiosWithAuth } from "@/api/interceptors";

class LocationsService {
  async getToLocations() {
    return await axiosWithAuth.get("/location/get/to");
  }
  async getFromLocations() {
    return await axiosWithAuth.get("/location/get/from");
  }
  async createLocations(data: any) {
    return await axiosWithAuth.post("/location/create", data);
  }
  async updateLocations(data: {
    name: string;
    description: string;
    type: string;
    id: string;
  }) {
    return await axiosWithAuth.put("/location/update", data);
  }
  async updateLocationsStatus(active: boolean, id:string) {
    return await axiosWithAuth.put(`/location/update/active?id=${id}&active=${active}`);
  } 
  async deleteLocations(id:string) {
    return await axiosWithAuth.delete(`/location/delete?id=${id}`);
  }
}
export default new LocationsService();
