import { create } from "zustand";

interface CalculationResponse {
  price?: number;
  fromLocation?: string;
  toLocation?: string;
  customs?: boolean;
  weight?: number;
  cub?: number;
}

interface CalculationStore {
  result: CalculationResponse | null;
  setResult: (result: CalculationResponse) => void;
  clearResult: () => void;
  response:  any;
  setResponse: (response: any) => void;
}

export const useCalculationStore = create<CalculationStore>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  clearResult: () => set({ result: null }),
  response: null,
  setResponse: (response) => set({ response }),
  clearResponse: () => set({ response: null }),
}));
