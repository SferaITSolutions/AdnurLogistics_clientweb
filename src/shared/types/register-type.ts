export interface RegisterState {
  step: number;
  phone: string; // Yangi qator
  nextStep: () => void;
  prevStep: () => void;
  setPhone: (phone: string) => void; // Yangi qator
  reset: () => void;
}