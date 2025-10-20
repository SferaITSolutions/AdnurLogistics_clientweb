import { create } from "zustand";

interface DashboardFilters {
  PersonalNumber: string;
  setPersonalNumber: (personalNumber: string) => void;
  status: string | "ALL" | "INTRANSIT" | "DELIVERED" | "PAYMENT_WAITING";
  setStatus: (status: string) => void;
}

export const useDashboardFilters = create<DashboardFilters>((set) => ({
  PersonalNumber: "",
  setPersonalNumber: (personalNumber) =>
    set({ PersonalNumber: personalNumber }),
  status: "ALL",
  setStatus: (status) => set({ status }),
}));
