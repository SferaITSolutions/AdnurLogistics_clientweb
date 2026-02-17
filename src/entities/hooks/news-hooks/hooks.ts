import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import NewsService from '@/services/news-services/news.service'; // o'zingizning service joylashgan joyga moslashtiring

const newsKeys = {
    all: ['news'] as const,
    list: () => [...newsKeys.all, 'list'] as const,
    detail: (id: string | number) => [...newsKeys.all, 'detail', id] as const,
} as const;

// 1. Ro'yxatni olish (pagination bilan, lekin hozircha page=1, size=katta son ishlatilmoqda)
export const useNewsList = () => {
    return useQuery({
        queryKey: newsKeys.list(),
        queryFn: async (data: { page: number; size: number } | any) => {
            const response = await NewsService.getNewsList(data);
            return response.data;
        },
        staleTime: 2 * 60 * 1000, // 2 daqiqa
    });
};

export const useNewsOneForAdmin = (id: number) => {
    return useQuery({
        queryKey: newsKeys.detail(id),
        queryFn: async () => {
            const response = await NewsService.getNewsOneForAdmin(id);
            return response.data;
        },
        enabled: !!id,
        retry: false,
    });
};
export const useNewsListForAdmin = () => {
    return useQuery({
        queryKey: newsKeys.list(),
        queryFn: async () => {
            const response = await NewsService.getNewsListForAdmin();
            return response.data;
        },
    });
};
// 2. Bitta yangilikni olish (agar kerak bo'lsa, hozircha komponentda ishlatilmayapti)
export const useNewsDetail = (id: string | null) => {
    return useQuery({
        queryKey: newsKeys.detail(id!),
        queryFn: async () => {
            // Agar backend'da GET /news/{id} endpointi bo'lsa → shuni ishlatish kerak
            // Hozircha service'da yo'q → agar kerak bo'lsa qo'shishingiz mumkin
            throw new Error('useNewsDetail hali implement qilinmagan');
        },
        enabled: !!id,
    });
};

// 3. Yangi yangilik yaratish
export const useCreateNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: {
            title: string;
            content: string;
            imgUrl: string;
            status: 'PUBLIC' | 'DRAFT';
        }) => NewsService.createNews(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: newsKeys.list() });
        },

        onError: (err) => {
            console.error('create news error:', err);
            // message.error(...) ni komponentda qo'yasiz
        },
    });
};

// 4. Yangilikni yangilash (PUT)
export const useUpdateNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: {
            title: string;
            content: string;
            imgUrl: string;
            status: 'PUBLIC' | 'DRAFT';
            id: string;
        }) => NewsService.updateNews(payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: newsKeys.list() });
            queryClient.invalidateQueries({ queryKey: newsKeys.detail(variables.id) });
        },

        onError: (err) => {
            console.error('update news error:', err);
        },
    });
};

// 5. Statusni yangilash
export const useUpdateNewsStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { id: string; status: 'PUBLIC' | 'DRAFT' }) =>
            NewsService.updateNewsStatus(payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: newsKeys.list() });
            queryClient.invalidateQueries({ queryKey: newsKeys.detail(variables.id) });
        },

        onError: (err) => {
            console.error('status update error:', err);
        },
    });
};

// 6. O'chirish
export const useDeleteNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: any) => NewsService.deleteNews(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: newsKeys.list() });
        },

        onError: (err) => {
            console.error('delete news error:', err);
        },
    });
};