export interface RegisterState {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}
