import { create } from 'zustand';

interface GlobalState {
  beforePhone: string;
  setBeforePhone: (v: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  beforePhone: '+998',
  setBeforePhone: (val: string) => set({ beforePhone: val }),
}));
