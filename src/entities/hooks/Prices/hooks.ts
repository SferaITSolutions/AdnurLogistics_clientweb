// hooks/useDeliveryPrices.ts
import pricesService from "@/services/prices/prices.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  result: DeliveryPrice[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-based)
  size: number;
}

// ===================== GET (Pagination bilan) =====================
export const useGetDeliveryPrices = (page: number = 0, size: number = 10) => {
  return useQuery<any>({
    queryKey: ["delivery-prices", page, size],
    queryFn: async () => {
      const response = await pricesService.getToPriceService({ page, size });
      return response.data;
    },
  });
};
export const useGetToList = (Language: any) => {
  // console.log(Language,11)

  return useQuery<PageResponse>({
    queryKey: ["to-list",Language],
    queryFn: async () => {
      const response = await pricesService.toLocationsList();
      return response.data;
    },
  });
};
export const useGetFromList = (Language: any) => {
  // console.log(Language,12)
  return useQuery<PageResponse>({
    queryKey: ["from-list", Language],
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
    mutationFn: (data: any) =>
      pricesService.createPriceService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-prices"] });
      toast.message("Buyurtma narxi qo'shildi")
    },
    onError: (error) => {
      toast.message(error.message && "Buyurtma narxini qo'shishda xatolik yuz berdi!")
    }
  });
};

// ===================== UPDATE =====================
export const useUpdateDeliveryPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => pricesService.updatePriceService(data),

    onSuccess: () => {
      toast.message("Ma'lumot yangilandi!")
      queryClient.invalidateQueries({ queryKey: ["delivery-prices"] });
    },
    onError: (error) => {
      toast.message(error.message || "Something went wrong!")
    }
  });
};

// ===================== DELETE =====================
export const useDeleteDeliveryPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pricesService.deletePriceService(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-prices"] });
      toast.message("Buyurtma narxi o'chirildi")
    },
    onError: () => {
      toast.message("Buyurtma narxini o'chirishda xatolik yuz berdi")
    }
  });
};
