import { create } from 'zustand';

interface UpdateProfileModalState {
  isModalOpen: boolean;
  fullname: string;
  openModal: (fullname: string) => void;
  closeModal: () => void;
}

export const useUpdateProfileModalStore = create<UpdateProfileModalState>((set) => ({
  isModalOpen: false,
  fullname: '',
  openModal: (fullname: string) => set({ isModalOpen: true, fullname }),
  closeModal: () => set({ isModalOpen: false, fullname: '' }),
}));
