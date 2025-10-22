import dashboardService from "@/services/client-dashboard/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export const useOrder = (data: any) => {
  return useQuery({
    queryKey: ["order"],
    queryFn: () => dashboardService.getOrdersData(data),
  });
};
export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => dashboardService.getOrderById(id),
    enabled: !!id,
  });
};
