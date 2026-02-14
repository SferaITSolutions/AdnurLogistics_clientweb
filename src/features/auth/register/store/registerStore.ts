import { RegisterState } from '@/shared/types/register-type';
import { getLocalItem } from '@/shared/utils/storage';
import { create } from 'zustand';

export const useRegisterStore = create<RegisterState>((set) => ({
  step: getLocalItem('stepKey') ? Number(getLocalItem('stepKey')) : 1,
  phone: '', 
  
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  
  setPhone: (phone: string) => set({ phone }),
  
  reset: () => set({ step: 1, phone: '' }), 
}));