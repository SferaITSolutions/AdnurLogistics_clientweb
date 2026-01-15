import notificationsService from '@/services/notifications/notifications.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// kalitlar (query keys)
export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
  one: () => [...notificationKeys.all, 'one'] as const,
};

// 1. Barcha avto-xabarlarni olish
export const useNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => notificationsService.getNotefication(),
    select: (response) => response.data, 
  });
};

// 2. Bitta avto-xabar ma'lumotini olish
export const useNotificationOne = () => {
  return useQuery({
    queryKey: notificationKeys.one(),
    queryFn: () => notificationsService.getNoteficationOne(),
    select: (response) => response.data,

  });
};

// 3. Yangi notification yaratish
export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { message: string; status: string }) =>
      notificationsService.createNotefication(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      toast.success('Notification yaratildi!');

    },

    onError: (error) => {
      console.error('Notification yaratishda xato:', error);
      toast.error('Notification yaratishda xatolik yuz berdi!');
    },
  });
};

export const useUpdateNotificationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { status: string; active: any }) =>
      notificationsService.updateNoteficationStatus(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      toast.success("Notification holati yangilandi!")
    },

    onError: (error) => {
        console.error('Status yangilashda xato:', error);
        toast.error('Status yangilashda xatolik yuz berdi');
    },
  });
};