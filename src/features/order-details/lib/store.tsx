import { create } from "zustand";

interface OrderDetailsStoreState {
  orderId: string | null;
  isModalOpen: boolean;
  setOrderId: (id: string | null) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useOrderDetailsStore = create<OrderDetailsStoreState>((set) => ({
  orderId: null,
  isModalOpen: false,
  setOrderId: (id) => set({ orderId: id }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
