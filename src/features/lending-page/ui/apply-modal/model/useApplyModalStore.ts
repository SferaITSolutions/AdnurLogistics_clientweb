// src/shared/store/modalStore.ts
import { create } from "zustand";
import { ModalState } from "@/shared/types/lenging-page-types";

export const useApplyModalStore = create<ModalState>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));
