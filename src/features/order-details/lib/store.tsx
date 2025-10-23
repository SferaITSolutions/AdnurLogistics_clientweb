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
  orderIdFilter: string | null;
  setOrderIdFilter: (id: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useOrderDetailsStore = create<OrderDetailsStoreState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  orderId: null,
  setOrderId: (id) => set({ orderId: id }),
  isModalOpen: false,
  orderIdFilter: null,
  setOrderIdFilter: (id) => set({ orderIdFilter: id }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  searchfilters: {},
  setSearchFilters: (filters) => set({ searchfilters: filters }),
  type: "0",
  setType: (type) => set({ type }),
  page: 0,
  setPage: (page) => set({ page }),
}));
