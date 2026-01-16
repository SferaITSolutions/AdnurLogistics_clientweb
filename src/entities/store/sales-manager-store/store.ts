"use client"
import { create } from "zustand";


export const useSalesOrderDetailsStore = create<any>((set) => ({
  loading: false,
  setLoading: (loading: any) => set({ loading }),
  orderIdFilter: null,
  setOrderIdFilter: (id: any) => set({ orderIdFilter: id }),
  page: 0,
  setPage: (page: any) => set({ page }),
  size: 10,
  setSize: (size: any) => set({ size }),
}));
