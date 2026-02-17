// hooks/useProducts.ts
import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import ProductService from '@/services/products/products.service';
import { toast } from 'sonner'; // yoki boshqa toast kutubxonangiz
import { axiosWithAuth } from '@/api/interceptors';

// Product types
export interface Product {
    id: string;
    nameUz: string;
    nameRu: string;
    nameEn: string;
    nameZh: string;
    nameTr: string;
    descriptionUz: string;
    descriptionRu: string;
    descriptionEn: string;
    descriptionZh: string;
    descriptionTr: string;
    imgUrl: string;
    calculateKg: boolean;
}

export interface ProductsPageParams {
    page: number;
    size: number;
}

export interface CreateProductData {
    nameUz: string;
    nameRu: string;
    nameEn: string;
    nameZh: string;
    nameTr: string;
    descriptionUz: string;
    descriptionRu: string;
    descriptionEn: string;
    descriptionZh: string;
    descriptionTr: string;
    imgUrl: string;
    calculateKg: boolean;
}

export interface UpdateProductData extends CreateProductData {
    id: string;
}

// Query keys
export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters?: unknown) => [...productKeys.lists(), filters] as const,
    pages: () => [...productKeys.all, 'page'] as const,
    page: (params: ProductsPageParams) => [...productKeys.pages(), params] as const,
    detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};

// Get products page hook
export const useProductsPage = (params: any) => {
    return useQuery({
        queryKey: productKeys.page(params),
        queryFn: async () => {
            const response = await ProductService.getProductsPage(params);
            return response.data;
        },
    });
};

// Get products list hook
export const useProductsList = () => {
    return useQuery({
        queryKey: productKeys.lists(),
        queryFn: async () => {
            const response = await ProductService.getProductsList();
            return response.data;
        },
    });
};

// Create product hook
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProductData) => ProductService.createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
            toast.success('Mahsulot muvaffaqiyatli yaratildi');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Mahsulot yaratishda xatolik');
        },
    });
};

// Update product hook
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => ProductService.updateProduct(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
            toast.success('Mahsulot muvaffaqiyatli yangilandi');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Mahsulotni yangilashda xatolik');
        },
    });
};

// Delete product hook
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => ProductService.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
            toast.success('Mahsulot muvaffaqiyatli o\'chirildi');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Mahsulotni o\'chirishda xatolik');
        },
    });
};
export const useUploadImage = (
    options?: UseMutationOptions<any, Error, FormData>
) => {
    return useMutation<any, Error, FormData>({
        mutationFn: async (formData: FormData) => {
            const response = await axiosWithAuth.post<any>(
                '/media/attachment/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    // agar progress kerak bo'lsa qo'shsa bo'ladi
                    // onUploadProgress: (progressEvent) => { ... }
                }
            );
            return response.data;
        },

        onSuccess: (data) => {
            // muvaffaqiyatli bo'lganda imgUrl ni olish mumkin
            toast.success('Rasm muvaffaqiyatli yuklandi');
            // console.log('Uploaded URL:', data.url || data.path);
        },

        onError: (error) => {
            toast.error('Rasm yuklashda xatolik: ' + (error.message || 'Noma\'lum xato'));
            console.error(error);
        },

        ...options, // agar komponentdan qo'shimcha onSuccess / onError berilsa
    });
};