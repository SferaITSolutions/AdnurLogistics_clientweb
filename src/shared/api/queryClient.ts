// src/shared/api/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Fokus o‘zgarsa qayta so‘ramaslik
      retry: 1, // 1 martagacha qayta urinadi
      staleTime: 1000 * 60 * 2, // 2 daqiqa davomida cache yangi hisoblanadi
    },
    mutations: {
      retry: false,
    },
  },
});
