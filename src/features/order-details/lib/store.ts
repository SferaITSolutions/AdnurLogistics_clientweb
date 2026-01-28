import { create } from 'zustand';

interface OrderDetailsStoreState {
  orderId: string | null;
  isModalOpen: boolean;
  statusOfInvoice: string | null;
  setStatusOfInvoice: (statusOfInvoice: string | null) => void;
  setOrderId: (id: string | null) => void;

  totalPrice: string | number | null; // ✅ Optional belgisini olib tashladik
  setTotalprice: (totalPrice: string | number | null) => void; // ✅ Optional belgisini olib tashladik

  openModal: () => void;
  closeModal: () => void;
  searchfilters: any;
  setSearchFilters: (filters: any) => void;
  type: string;
  setType: (type: string) => void;
  page: number;
  setPage: (page: number) => void;
  size: number;
  setSize: (size: number) => void;
  orderIdFilter: string | null;
  setOrderIdFilter: (id: string | null) => void;
  orderIdFilterSaller: string | null;
  setOrderIdFilterSaller: (id: string | null) => void;
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
  statusOfInvoice: null,
  setStatusOfInvoice: (status) => set({ statusOfInvoice: status }),
  
  totalPrice: null, // ✅ Default qiymat
  setTotalprice: (totalPrice) => set({ totalPrice }), // ✅ Qisqartirilgan syntax

  isModalOpen: false,
  orderIdFilter: null,
  setOrderIdFilter: (id) => set({ orderIdFilter: id }),
  orderIdFilterSaller: null,
  setOrderIdFilterSaller: (orderId: string | null) =>
    set({ orderIdFilterSaller: orderId }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, orderId: null }),
  searchfilters: {},
  setSearchFilters: (filters) => set({ searchfilters: filters }),
  type: '0',
  setType: (type) => set({ type }),
  page: 0,
  setPage: (page) => set({ page }),
  size: 10,
  setSize: (size) => set({ size }),
  startEndDate: { start: null, end: null },
  setStartEndDate: ({ start, end }) => set({ startEndDate: { start, end } }),
}));