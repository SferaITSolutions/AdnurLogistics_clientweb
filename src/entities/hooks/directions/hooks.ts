// hooks/useDirections.ts
// yoki fayl nomi: useProductDirections.ts — qaysi uslubni yoqtirsangiz

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DirectionService from '@/services/directions/directions.service';           // yo‘lni o‘zingizga moslang
import { message } from 'antd';

// Query keys — yaxshi tashkil qilish uchun
export const directionKeys = {
  all: ['directions'] as const,
  byProduct: (productId: string) => [...directionKeys.all, 'byProduct', productId] as const,
  detail: (directionId: string) => [...directionKeys.all, 'detail', directionId] as const,
};

// 1. Bir mahsulotga tegishli barcha yo‘nalishlarni olish
export const useDirectionsByProduct = (productId: string | undefined) => {
  return useQuery({
    queryKey: directionKeys.byProduct(productId!),
    queryFn: async () => {
      if (!productId) throw new Error('productId talab qilinadi');
      const res = await DirectionService.getDirection(productId);
      return res.data; // [] yoki { directions: [...] } qaytarsa moslashtiring
    },
    enabled: !!productId,                // productId bo‘lmasa so‘rov yubormaydi
    staleTime: 2 * 60 * 1000,            // 2 daqiqa
    gcTime: 5 * 60 * 1000,
  });
};

// 2. Yangi yo‘nalish yaratish (create)
export const useCreateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { productId: string; fromLocationId: string; toLocationId: string }) =>
      DirectionService.createDirection(data).then(res => res.data),

    onSuccess: (newDirection, variables) => {
      message.success('Yo‘nalish muvaffaqiyatli qo‘shildi');

      // Tegishli product bo‘yicha ro‘yxatni yangilash
      queryClient.invalidateQueries({
        queryKey: directionKeys.byProduct(variables.productId),
      });
    },

    onError: (error: any) => {
      message.error('Yo‘nalish qo‘shishda xato: ' + (error.message || 'Noma‘lum xato'));
    },
  });
};

// 3. Yo‘nalishni yangilash (update)
export const useUpdateDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;
      productId: string;
      fromLocationId: string;
      toLocationId: string;
    }) => DirectionService.updateDirection(data).then(res => res.data),

    onSuccess: (updatedDirection, variables) => {
      message.success('Yo‘nalish muvaffaqiyatli yangilandi');

      // Tegishli product ro‘yxatini yangilash
      queryClient.invalidateQueries({
        queryKey: directionKeys.byProduct(variables.productId),
      });

      // Agar alohida detail sahifasi bo‘lsa
      queryClient.invalidateQueries({
        queryKey: directionKeys.detail(variables.id),
      });
    },

    onError: (error: any) => {
      message.error('Yangilashda xato: ' + (error.message || 'Noma‘lum xato'));
    },
  });
};

// 4. Yo‘nalishni o‘chirish (delete)
export const useDeleteDirection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; productId: string }) =>
      DirectionService.deleteDirection(params.id).then(res => res.data),

    onSuccess: (_, variables) => {
      message.success('Yo‘nalish o‘chirildi');

      // Ro‘yxatni yangilash
      queryClient.invalidateQueries({
        queryKey: directionKeys.byProduct(variables.productId),
      });
    },

    onError: (error: any) => {
      message.error('O‘chirishda xato: ' + (error.message || 'Noma‘lum xato'));
    },
  });
};