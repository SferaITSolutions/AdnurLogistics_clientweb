import dashboardService from "@/services/client-dashboard/dashboard.service";
import { useQuery } from "@tanstack/react-query";

let lastFetchtime = 0;
export const useOrder = (data: any) => {
  return useQuery({
    queryKey: ["order", data],
    queryFn: async () => {
      const now = Date.now();

      if (now - lastFetchtime > 3000) {
        const waitTime = 3000 - (now - lastFetchtime);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
      lastFetchtime = Date.now();
      return dashboardService.getOrdersData(data);
    },
  });
};
export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => dashboardService.getOrderById(id),
    enabled: !!id,
  });
};
