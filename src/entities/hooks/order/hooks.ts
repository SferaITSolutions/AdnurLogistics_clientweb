import dashboardService from "@/services/client-dashboard/dashboard.service";
import { useQuery } from "@tanstack/react-query";

let lastFetchTime: number | null = null;

export const useOrder = (data: any) => {
  return useQuery({
    queryKey: ["order", data],
    queryFn: async () => {
      const now = Date.now();
      if (lastFetchTime && now - lastFetchTime < 3000) {
        const waitTime = 3000 - (now - lastFetchTime);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
      const response = await dashboardService.getOrdersData(data);
      lastFetchTime = Date.now();

      return response;
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
