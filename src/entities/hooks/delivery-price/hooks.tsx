// hooks/useDeliveryPrices.ts  (yoki shunga o'xshash nom bilan)

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DeliveryPriceService from '@/services/delivery-price/delivery-price.service'; // yo'lni moslashtiring
import { message } from 'antd';
import { toast } from 'sonner';

// Query keys — yaxshi tashkil qilish uchun
export const deliveryPriceKeys = {
  all: ['delivery-prices'] as const,
  listByProduct: (productId: string) => [...deliveryPriceKeys.all, 'byProduct', productId] as const,
  paginated: (params: { page: number; size: number; productId: string }) =>
    [...deliveryPriceKeys.all, 'paginated', params] as const,
  detail: (id: string) => [...deliveryPriceKeys.all, 'detail', id] as const,
};

// ====================
// 1. Sahifalangan ro'yxatni olish (pagination bilan)
// ====================
export const useDeliveryPricesPaginated = (params: {
  page: number;
  size: number;
  productId: string;
}) => {
  return useQuery({
    queryKey: deliveryPriceKeys.paginated(params),
    queryFn: async () => {
      const res = await DeliveryPriceService.getDeliveryPrice(params);
      return res.data;
    },
    enabled: !!params.productId,
    // keepPreviousData: true, // paginationda yaxshi UX uchun
    staleTime: 2 * 60 * 1000,
  });
};

// ====================
// 2. Yangi narx qo'shish (create)
// ====================
export const useCreateDeliveryPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { pricelist: Array<{
      minWeight: number;
      maxWeight: number;
      cub3: number;
      overPrice: boolean;
      directionId: string;
    }> }) => DeliveryPriceService.createDeliveryPrice(data).then(res => res.data),

    onSuccess: (newPrice, variables) => {
      toast.success("Narx muvaffaqiyatli qo'shildi");

      variables.pricelist.forEach(item => {
        queryClient.invalidateQueries({
          queryKey: deliveryPriceKeys.listByProduct(item.directionId), // agar directionId orqali bog'langan bo'lsa
        });
      });

      // yoki eng oddiy yo'l bilan
      queryClient.invalidateQueries({ queryKey: deliveryPriceKeys.all });
    },

    onError: (err: any) => {
      message.error("Narx qo'shishda xato: " + (err.message || "Noma'lum xato"));
    },
  });
};

// ====================
// 3. Narxni yangilash (update)
// ====================
export const useUpdateDeliveryPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;
      minWeight: number;
      maxWeight: number;
      cub3: number;
      overPrice: boolean;
      directionId: string;
    }) => DeliveryPriceService.updateDeliveryPrice(data).then(res => res.data),

    onSuccess: (updatedPrice, variables) => {
      message.success("Narx muvaffaqiyatli yangilandi");

      // Tegishli ro'yxatni yangilash
      queryClient.invalidateQueries({
        queryKey: deliveryPriceKeys.paginated({
          page: 0, // birinchi sahifani yangilash yetarli bo'ladi
          size: 10,
          productId: variables.directionId, // agar directionId product bilan bog'liq bo'lsa
        }),
      });

      queryClient.invalidateQueries({
        queryKey: deliveryPriceKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({ queryKey: deliveryPriceKeys.all });
    },

    onError: (err: any) => {
      message.error("Yangilashda xato: " + (err.message || "Noma'lum xato"));
    },
  });
};

// ====================
// 4. Narxni o'chirish (delete)
// ====================
export const useDeleteDeliveryPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeliveryPriceService.deleteDeliveryPrice(id),

    onMutate: async (id: string) => {
      // Optimistic update — agar xohlasangiz
      // lekin bu yerda oddiy invalidate yetarli
    },

    onSuccess: (_, id) => {
      message.success("Narx o'chirildi");

      // Eng sodda va ishonchli yo'l
      queryClient.invalidateQueries({ queryKey: deliveryPriceKeys.all });

      // Agar aniq productId ma'lum bo'lsa, shuni ishlatish mumkin
      // queryClient.invalidateQueries({ queryKey: deliveryPriceKeys.listByProduct(someProductId) });
    },

    onError: (err: any) => {
      message.error("O'chirishda xato: " + (err.message || "Noma'lum xato"));
    },
  });
};