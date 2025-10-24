import { create } from 'zustand';

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
  startEndDate: { start: string | null; end: string | null };
  setStartEndDate: (dates: { start: string | null; end: string | null }) => void;
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
  closeModal: () => set({ isModalOpen: false, startEndDate: { end: null, start: null } }),
  searchfilters: {},
  setSearchFilters: (filters) => set({ searchfilters: filters }),
  type: '0',
  setType: (type) => set({ type }),
  page: 0,
  setPage: (page) => set({ page }),
  // startEndDate: { start: '2025/10/10', end: '2025/12/12' },
  startEndDate: { start: null, end: null },
  setStartEndDate: ({ start, end }) => set({ startEndDate: { start, end } }),
}));
