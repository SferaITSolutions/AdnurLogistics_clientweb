import { create } from "zustand";

interface OrderDetailsStoreState {
  orderId: string | null;
  isModalOpen: boolean;
  setOrderId: (id: string | null) => void;
  openModal: () => void;
  closeModal: () => void;
  searchfilters: any;
  setSearchFilters: (filters: any) => void;
  type: string;
  setType: (type: string) => void;
  page: number;
  setPage: (page: number) => void;
}

export const useOrderDetailsStore = create<OrderDetailsStoreState>((set) => ({
  orderId: null,
  isModalOpen: false,
  setOrderId: (id) => set({ orderId: id }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  searchfilters: {},
  setSearchFilters: (filters) => set({ searchfilters: filters }),
  type: 'all',
  setType: (type) => set({ type }),
  page: 0,
  setPage: (page) => set({ page }),
}));
