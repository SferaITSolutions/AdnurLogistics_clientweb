import { create } from "zustand";
import { RegisterState } from "@/shared/types/register-type";


export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  reset: () => set({ step: 1 }),
}));
