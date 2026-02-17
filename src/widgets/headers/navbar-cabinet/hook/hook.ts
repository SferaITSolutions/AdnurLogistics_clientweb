import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { meService } from '@/services/me/me.service';
import { toast } from 'sonner';
import { getLocalItem } from '@/shared/utils/storage';

// Get Me
export const useMe = () => {
  const role = localStorage.getItem("roleName")
  const code = localStorage.getItem("code")
  const token = getLocalItem("access_token")
  const refreshToken = getLocalItem("refresh_token")
  return useQuery({
    queryKey: ['fetch-me', role, code, token, refreshToken],
    queryFn: () => meService.me(),
    // staleTime: 5 * 60 * 1000,
  });
};

// Create course
export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: string) => meService.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetch-me'] });
      toast.success("Ma'lumot muvaffaqiyatli yangilandi!");
    },
    onError: (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });
};
