import { create } from 'zustand';

interface FormState {
  values: Record<string, any>;
  setValue: (field: string, value: any) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  values: {},
  setValue: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value },
    })),
  resetForm: () => set({ values: {} }),
}));
