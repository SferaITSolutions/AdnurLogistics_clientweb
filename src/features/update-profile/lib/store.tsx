import { create } from "zustand";

interface UpdateProfileModalState {
  isModalOpen: boolean;
  userId: string | null;
  openModal: (userId: string) => void;
  closeModal: () => void;
}

export const useUpdateProfileModalStore = create<UpdateProfileModalState>(
  (set) => ({
    isModalOpen: false,
    userId: null,
    openModal: (userId: string) => set({ isModalOpen: true, userId }),
    closeModal: () => set({ isModalOpen: false, userId: null }),
  })
);
