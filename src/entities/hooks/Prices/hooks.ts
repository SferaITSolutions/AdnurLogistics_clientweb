// hooks/useDeliveryPrices.ts
import pricesService from "@/services/prices/prices.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Umumiy interface
export interface DeliveryPrice {
  id: string;
  minWeight: number;
  maxWeight: number;
  cub3: number;
  price: number;
  cubMultiplier: number;
  priceMultiplier: number;
  fromLocation: string;
  toLocation: string;
}

// GET paginated response uchun tip
interface PageResponse {
  content: DeliveryPrice[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-based)
  size: number;
}

// ===================== GET (Pagination bilan) =====================
export const useGetDeliveryPrices = (page: number = 0, size: number = 10) => {
  return useQuery<PageResponse>({
    queryKey: ["delivery-prices", page, size],
    queryFn: async () => {
      const response = await pricesService.getToPriceService({ page, size });
      return response.data;
    },
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000,
  });
};
export const useGetToList = () => {
  return useQuery<PageResponse>({
    queryKey: ["to-list"],
    queryFn: async () => {
      const response = await pricesService.toLocationsList();
      return response.data;
    },
  });
};
export const useGetFromList = () => {
  return useQuery<PageResponse>({
    queryKey: ["from-list"],
    queryFn: async () => {
      const response = await pricesService.fromLocationsList();
      return response.data;
    },
  });
};

// ===================== CREATE =====================
export const useCreateDeliveryPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<DeliveryPrice, "id">) =>
      pricesService.createPriceService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-prices"] });
    },
  });
};

// ===================== UPDATE =====================
export const useUpdateDeliveryPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeliveryPrice) => pricesService.updatePriceService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-prices"] });
    },
  });
};

// ===================== DELETE =====================
export const useDeleteDeliveryPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pricesService.deletePriceService(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-prices"] });
    },
  });
};
