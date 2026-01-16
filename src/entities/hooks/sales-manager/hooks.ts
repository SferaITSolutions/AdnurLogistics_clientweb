import salesManagerService from "@/services/sales-manager/sales-manager.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSelesOrders = (data:  any) => {
    return useQuery<any>({
      queryKey: ["delivery-prices", data] ,
      queryFn: async () => {
        const response = await salesManagerService.getGetSalesOrders(data);
        return response;
      },
      retry: false,
      enabled: !!data
    });
};